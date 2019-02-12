import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import qs from 'qs';

import {
  sortNums,
  sortDates,
  sortStrings,
} from '../../utils/sort';
import { compose } from '../../utils';
import { SORT_TYPES } from '../../utils/constants';
import { DataFetcherContext } from '../DataFetcher';

const withJobLogsSortComponent = WrappedComponent => {
  return class extends Component {
    static propTypes = {
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
      }).isRequired,
      location: PropTypes.shape({
        search: PropTypes.string.isRequired,
        pathname: PropTypes.string.isRequired,
      }).isRequired,
      formatter: PropTypes.object,
    };

    static defaultProps = { formatter: {} };

    static contextType = DataFetcherContext;

    constructor(props) {
      super(props);

      this.state = {
        sort: 'completedDate',
        direction: SORT_TYPES.ASCENDING,
      };

      this.sortColumns = {
        fileName: {
          sortFn: sortStrings,
          useFormatterFn: true,
        },
        jobProfileName: {
          sortFn: sortStrings,
          useFormatterFn: false,
        },
        jobExecutionHrId: {
          sortFn: sortNums,
          useFormatterFn: false,
        },
        runBy: {
          sortFn: sortStrings,
          useFormatterFn: true,
        },
        completedDate: {
          sortFn: sortDates,
          useFormatterFn: false,
        },
      };
    }

    componentDidMount() {
      this.setLogsSort();
    }

    setLogsSort() {
      const { location: { search } } = this.props;

      const {
        sort = 'completedDate',
        direction = SORT_TYPES.ASCENDING,
      } = qs.parse(search.slice(1));

      this.setState({
        sort,
        direction,
      });
    }

    prepareLogsData() {
      const {
        sort,
        direction,
      } = this.state;

      const logs = get(this.context, ['logs', 'logDtos'], []);

      return logs.sort((a, b) => {
        const cellFormatter = this.props.formatter[sort];
        const sortDir = direction === SORT_TYPES.ASCENDING ? 1 : -1;
        const {
          useFormatterFn,
          sortFn,
        } = this.sortColumns[sort];

        return sortDir * (useFormatterFn && cellFormatter ?
          sortFn(cellFormatter(a), cellFormatter(b)) :
          sortFn(a[sort], b[sort]));
      });
    }

    onSort = (e, { name: fieldName }) => {
      const {
        history,
        location,
      } = this.props;
      const {
        sort,
        direction,
      } = this.state;

      const isSameField = sort === fieldName;
      let sortDir = SORT_TYPES.ASCENDING;

      if (isSameField) {
        sortDir = direction === sortDir ? SORT_TYPES.DESCENDING : sortDir;
      }

      const sortState = {
        sort: fieldName,
        direction: sortDir,
      };

      this.setState(sortState);

      history.push({
        pathname: location.pathname,
        search: `?${qs.stringify(sortState)}`,
      });
    };

    render() {
      const { hasLoaded } = this.context;
      const {
        sort,
        direction,
      } = this.state;

      const contentData = this.prepareLogsData();

      return (
        <WrappedComponent
          {...this.props}
          contentData={contentData}
          sortField={sort}
          sortDirection={direction}
          hasLoaded={hasLoaded}
          onSort={this.onSort}
        />
      );
    }
  };
};

export const withJobLogsSort = compose(
  withRouter,
  withJobLogsSortComponent,
);
