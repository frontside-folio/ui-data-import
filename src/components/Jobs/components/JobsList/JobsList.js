import React from 'react';
import PropTypes from 'prop-types';

import { List } from '@folio/stripes/components';
import { EndOfItem } from '@folio/stripes-data-transfer-components';

import { Preloader } from '../../../Preloader';
import { Job } from '../Job';
import { jobExecutionPropTypes } from '../Job/jobExecutionPropTypes';

import css from './JobsList.css';

export const JobsList = ({
  jobs,
  hasLoaded,
  isEmptyMessage = '',
}) => {
  const itemFormatter = job => (
    <Job
      key={job.hrId}
      job={job}
    />
  );
  const EmptyMessage = (
    <span
      data-test-empty-message
      className={css.emptyMessage}
    >
      {isEmptyMessage}
    </span>
  );
  const LoadedJobsList = (
    <div data-test-jobs-list>
      <List
        items={jobs}
        itemFormatter={itemFormatter}
        isEmptyMessage={EmptyMessage}
        listClass={css.list}
        marginBottom0
      />
    </div>
  );

  return (
    <div className={css.listContainer}>
      {hasLoaded ? LoadedJobsList : <Preloader />}
      <EndOfItem />
    </div>
  );
};

JobsList.propTypes = {
  jobs: PropTypes.arrayOf(jobExecutionPropTypes).isRequired,
  hasLoaded: PropTypes.bool.isRequired,
  isEmptyMessage: PropTypes.node,
};
