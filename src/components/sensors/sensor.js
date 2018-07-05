import React from 'react';
import LineChart from '../charts/line-chart';
import Loading from '../shared/loading';

const Sensor = props => (
  <div className="card">
    <header className="card-header">
      <p className="card-header-title">
        <span className="has-text-grey-dark has-text-weight-normal is-size-5" style={{ marginRight: 15 }}>{`Sensor de ${props.sensor}:`}</span>
        <span className="has-text-black-ter has-text-weight-normal is-size-4">{props.current}</span>
        <Loading loading={props.isFetching} />
      </p>
    </header>
    <div className="card-content" style={{ padding: 10 }}>
      <div className="content has-text-centered">
        <LineChart {...props} />
      </div>
    </div>
  </div>
);

export default Sensor;
