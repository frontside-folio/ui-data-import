import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import {
  forEach,
  isEmpty,
  map,
  omit,
  some,
} from 'lodash';

import {
  withStripes,
  stripesShape,
} from '@folio/stripes/core';
import {
  Layout,
  Callout,
} from '@folio/stripes/components';

import { EndOfList } from '../EndOfList';
import { Preloader } from '../Preloader';
import {
  FileItem,
  LeavePageModal,
  fileStatuses,
} from './components';
import {
  compose,
  createUrl,
  createOkapiHeaders,
  xhrAddHeaders,
} from '../../utils';
import { DEFAULT_TIMEOUT_BEFORE_FILE_DELETION } from '../../utils/constants';
import * as API from './utils/upload';
import { UploadingJobsContext } from '../UploadingJobsContextProvider';

class UploadingJobsDisplayComponent extends Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
    history: PropTypes.shape({
      block: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired,
    }).isRequired,
    timeoutBeforeFileDeletion: PropTypes.number, // milliseconds
  };

  static defaultProps = { timeoutBeforeFileDeletion: DEFAULT_TIMEOUT_BEFORE_FILE_DELETION };

  static contextType = UploadingJobsContext;

  static knownErrorsIDs = ['upload.fileSize.invalid'];

  static getUploadFilesErrorMessageID(msg) {
    const defaultErrorId = 'upload.invalid';

    return UploadingJobsDisplayComponent.knownErrorsIDs.includes(msg) ? msg : defaultErrorId;
  }

  constructor(props, context) {
    super(props, context);

    const { stripes: { okapi } } = this.props;
    const { files } = this.context;

    const { url: host } = okapi;

    this.state = {
      hasLoaded: false,
      renderLeaveModal: false,
      files: this.prepareFiles(files),
    };

    this.uploadDefinitionUrl = createUrl(`${host}/data-import/upload/definition`);
    this.fileUploaderUrl = createUrl(`${host}/data-import/upload/file`);
    this.deleteFileUrl = file => createUrl(`${host}/data-import/upload/definition/file/${file.id}`, {
      uploadDefinitionId: file.uploadDefinitionId,
    });
    this.deleteFileTimeouts = {};
    this.fileRemovalMap = {
      [fileStatuses.UPLOADED]: this.handleDeleteSuccessfullyUploadedFile,
      [fileStatuses.FAILED]: this.deleteFileAPI,
      [fileStatuses.FAILED_DEFINITION]: this.deleteFileFromState,
    };
  }

  async componentDidMount() {
    this.mounted = true;

    this.uploadJobs();
    this.setPageLeaveHandler();
  }

  componentWillUnmount() {
    this.mounted = false;

    this.cancelFileRemovals();
    this.resetPageLeaveHandler();
  }

  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  // prevent from leaving the page in case if uploading is in progress
  setPageLeaveHandler() {
    const { history } = this.props;

    this.unblockNavigation = history.block(this.handleNavigation);
    window.addEventListener('beforeunload', this.handlePageLeave);
  }

  resetPageLeaveHandler() {
    this.unblockNavigation();
    window.removeEventListener('beforeunload', this.handlePageLeave);
  }

  handlePageLeave = event => {
    const shouldPrompt = this.filesUploading;

    if (shouldPrompt) {
      event.returnValue = true;

      return true;
    }

    return null;
  };

  handleNavigation = nextLocation => {
    const shouldPrompt = this.filesUploading;

    if (shouldPrompt) {
      this.setState({
        renderLeaveModal: true,
        nextLocation,
      });
    }

    return !shouldPrompt;
  };

  get filesUploading() {
    const { files } = this.state;

    return some(files, file => file.status === fileStatuses.UPLOADING);
  }

  cancelFileRemovals() {
    forEach(this.deleteFileTimeouts, clearTimeout);
    this.deleteFileTimeouts = {};
  }

  async uploadJobs() {
    try {
      const { updateUploadDefinition } = this.context;

      const uploadDefinition = await updateUploadDefinition();

      this.setState({ hasLoaded: true });

      if (!isEmpty(uploadDefinition)) {
        return;
      }

      const { files } = this.state;

      // post file upload definition with all files metadata as
      // individual file upload should have upload definition id in the URL
      const [errMsg, response] = await API.createUploadDefinition(
        files,
        this.uploadDefinitionUrl,
        this.createFilesDefinitionHeaders(),
      );

      if (errMsg) {
        this.handleAllFilesUploadFail(errMsg);

        return;
      }

      await this.updateFilesWithFileDefinitionMetadata(response.fileDefinitions);

      this.uploadFiles();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  updateFilesWithFileDefinitionMetadata(fileDefinitions) {
    return this.setStateAsync(state => {
      const updatedFiles = { ...state.files };

      forEach(fileDefinitions, definition => {
        const {
          uiKey,
          id,
          uploadDefinitionId,
        } = definition;

        updatedFiles[uiKey] = {
          ...updatedFiles[uiKey],
          id,
          uploadDefinitionId,
        };
      });

      return { files: updatedFiles };
    });
  }

  cancelCurrentFileUpload() {
    if (this.currentFileUploadXhr) {
      this.currentFileUploadXhr.abort();
    }
  }

  async uploadFiles() {
    const { setFiles } = this.context;
    const { files } = this.state;

    for (const fileKey of Object.keys(files)) {
      try {
        // cancel current and next file uploads if component is unmounted
        if (!this.mounted) {
          this.cancelCurrentFileUpload();
          setFiles();

          break;
        }

        // eslint-disable-next-line no-await-in-loop
        const response = await this.uploadFile(fileKey);

        this.handleFileUploadSuccess(response, fileKey);
      } catch (error) {
        this.handleFileUploadFail(fileKey);
      }
    }

    this.currentFileUploadXhr = null;
    setFiles();
  }

  uploadFile(fileKey) {
    return new Promise(async (resolve, reject) => {
      try {
        const { files: { [fileKey]: fileMeta } } = this.state;

        const urlWithQueryParams = createUrl(this.fileUploaderUrl, {
          fileId: fileMeta.id,
          uploadDefinitionId: fileMeta.uploadDefinitionId,
        });

        this.currentFileUploadXhr = new XMLHttpRequest();

        this.currentFileUploadXhr.open('POST', urlWithQueryParams);

        xhrAddHeaders(this.currentFileUploadXhr, this.createUploadFilesHeaders());

        this.currentFileUploadXhr.upload.onprogress = event => {
          this.onFileUploadProgress(fileKey, event);
        };

        this.currentFileUploadXhr.onreadystatechange = () => {
          const {
            status,
            readyState,
            response,
          } = this.currentFileUploadXhr;

          if (readyState !== 4) {
            return;
          }

          try {
            const parsedResponse = JSON.parse(response);

            if (status === 200) {
              resolve(parsedResponse);
            } else {
              reject(parsedResponse);
            }
          } catch (error) {
            reject(error);
          }
        };

        this.currentFileUploadXhr.send(fileMeta.file);
      } catch (error) {
        reject(error);
      }
    });
  }

  createFilesDefinitionHeaders() {
    const { stripes: { okapi } } = this.props;

    return {
      ...createOkapiHeaders(okapi),
      'Content-Type': 'application/json',
    };
  }

  createUploadFilesHeaders() {
    const { stripes: { okapi } } = this.props;

    return {
      ...createOkapiHeaders(okapi),
      'Content-Type': 'application/octet-stream',
    };
  }

  createDeleteFileHeaders() {
    const { stripes: { okapi } } = this.props;

    return createOkapiHeaders(okapi);
  }

  prepareFiles(files = []) {
    return files.reduce((res, file) => {
      // `uiKey` is needed in order to match the individual file on UI with
      // the response from the backend since it returns the all files state
      const uiKey = `${file.name}${file.lastModified}`;
      // if file is already uploaded it has already the `uiKey` and if not it should be assigned
      const key = file.uiKey || uiKey;

      const preparedFile = {
        id: file.id,
        uploadDefinitionId: file.uploadDefinitionId,
        key,
        name: file.name,
        size: file.size,
        loading: false,
        uploadedDate: file.uploadedDate,
        status: fileStatuses.UPLOADING,
        currentUploaded: 0,
        file,
      };

      return {
        ...res,
        [key]: preparedFile,
      };
    }, {});
  }

  updateFileState(fileKey, data) {
    this.setState(state => {
      const updatedFile = {
        ...state.files[fileKey],
        ...data,
      };

      return {
        files: {
          ...state.files,
          [fileKey]: updatedFile,
        },
      };
    });
  }

  onFileUploadProgress = (fileKey, { loaded: uploadedValue }) => {
    this.updateFileState(fileKey, { uploadedValue });
  };

  handleFileUploadSuccess = (response, fileKey) => {
    const { uploadedDate } = response.fileDefinitions.find(file => file.uiKey === fileKey);

    this.updateFileState(fileKey, {
      status: fileStatuses.UPLOADED,
      uploadedDate,
    });
  };

  handleFileUploadFail = fileKey => {
    this.updateFileState(fileKey, { status: fileStatuses.FAILED });
  };

  handleUndoDeleteFile = fileKey => {
    clearTimeout(this.deleteFileTimeouts[fileKey]);

    this.updateFileState(fileKey, { status: fileStatuses.UPLOADED });
  };

  handleDeleteFile = (fileKey, fileStatus) => {
    const deleteFile = this.fileRemovalMap[fileStatus];

    if (deleteFile) {
      deleteFile(fileKey, fileStatus);
    }
  };

  deleteFileAPI = async (fileKey, fileStatus) => {
    const { files: { [fileKey]: fileMeta } } = this.state;

    this.updateFileState(fileKey, { loading: true });

    try {
      await API.deleteFile(
        this.deleteFileUrl(fileMeta),
        this.createDeleteFileHeaders(),
      );

      this.deleteFileFromState(fileKey);
    } catch (error) {
      this.updateFileState(fileKey, {
        status: fileStatus,
        loading: false,
      });

      const errorMessage = (
        <FormattedMessage
          id="ui-data-import.fileDeleteError"
          values={{ name: <strong>{fileMeta.name}</strong> }}
        />
      );

      this.callout.sendCallout({
        type: 'error',
        message: errorMessage,
      });

      console.error(error); // eslint-disable-line no-console
    }
  };

  handleDeleteSuccessfullyUploadedFile = (fileKey, fileStatus) => {
    const { timeoutBeforeFileDeletion } = this.props;

    this.deleteFileTimeouts[fileKey] = setTimeout(() => {
      this.deleteFileAPI(fileKey, fileStatus);
    }, timeoutBeforeFileDeletion);

    this.updateFileState(fileKey, { status: fileStatuses.DELETING });
  };

  deleteFileFromState = fileKey => {
    this.setState(state => {
      const updatedFiles = omit(state.files, fileKey);

      return { files: updatedFiles };
    });
  };

  handleAllFilesUploadFail(errMsg) {
    const errorMsgTranslationID = UploadingJobsDisplayComponent.getUploadFilesErrorMessageID(errMsg);

    this.setState(state => {
      const files = Object.keys(state.files)
        .reduce((res, fileKey) => {
          const updatedFile = {
            ...state.files[fileKey],
            status: fileStatuses.FAILED_DEFINITION,
            errorMsgTranslationID,
          };

          return {
            ...res,
            [fileKey]: updatedFile,
          };
        }, {});

      return { files };
    });
  }

  renderFiles() {
    const { files } = this.state;

    if (isEmpty(files)) {
      return (
        <Layout className="textCentered">
          <FormattedMessage id="ui-data-import.noUploadedFiles" />
        </Layout>
      );
    }

    return map(files, (file, fileKey) => {
      const {
        status,
        name,
        size,
        uploadedValue,
        uploadedDate,
        loading,
        errorMsgTranslationID,
      } = file;

      return (
        <FileItem
          key={fileKey}
          uiKey={fileKey}
          status={status}
          name={name}
          size={size}
          loading={loading}
          uploadedValue={uploadedValue}
          errorMsgTranslationID={errorMsgTranslationID}
          uploadedDate={uploadedDate}
          onDelete={this.handleDeleteFile}
          onUndoDelete={this.handleUndoDeleteFile}
        />
      );
    });
  }

  createCalloutRef = ref => {
    this.callout = ref;
  };

  continue = () => {
    const { history } = this.props;
    const { nextLocation } = this.state;

    this.unblockNavigation();
    history.push(nextLocation.pathname);
  };

  closeModal = () => {
    this.setState({ renderLeaveModal: false });
  };

  render() {
    const {
      hasLoaded,
      renderLeaveModal,
    } = this.state;

    if (!hasLoaded) {
      return <Preloader />;
    }

    return (
      <div>
        {this.renderFiles()}
        <EndOfList />
        <Callout ref={this.createCalloutRef} />
        <LeavePageModal
          open={renderLeaveModal}
          onConfirm={this.closeModal}
          onCancel={this.continue}
        />
      </div>
    );
  }
}

export const UploadingJobsDisplay = compose(
  withRouter,
  withStripes,
)(UploadingJobsDisplayComponent);
