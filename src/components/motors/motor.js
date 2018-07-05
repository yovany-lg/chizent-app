import React from 'react';
import DonutChart from '../charts/donut-chart';
import Loading from '../shared/loading';

const Motor = ({ motorId, title, value, isFetching }) => (
  <div className="card">
    <header className="card-header">
      <p className="card-header-title">
        <span className="has-text-grey-dark has-text-weight-normal is-size-5" style={{ marginRight: 10 }}>{title}</span>
        <Loading loading={isFetching} />
      </p>
    </header>
    <div className="card-content" style={{ padding: 10 }}>
      <div className="content has-text-centered">
        <DonutChart motorId={motorId} title={title} value={value} />
      </div>
    </div>
  </div>
);

export default Motor;
