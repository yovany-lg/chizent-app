import React from 'react';
import Sensor from './sensor';

const Sensors = ({ ph, temp, isFetchingStatus }) => (
  <div className="columns is-desktop is-centered">
    <div className="column is-half-desktop">
      <Sensor
        sensor="pH"
        {...ph}
        title="Nivel de pH"
        current={ph ? `${ph.current} pH` : ''}
        color="blue"
        isFetching={isFetchingStatus}
      />
    </div>
    <div className="column is-half-desktop">
      <Sensor
        sensor="Temperatura"
        {...temp}
        title="Temperatura [°C]"
        current={temp ? `${temp.current} °C` : ''}
        color="red"
        isFetching={isFetchingStatus}
      />
    </div>
  </div>
);

export default Sensors;
