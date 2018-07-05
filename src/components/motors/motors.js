import React from 'react';
import Motor from './motor';

const Motors = ({ motor1, motor2, isFetchingStatus }) => (
  <div className="columns is-desktop">
    <div className="column is-half-desktop">
      <Motor motorId="AcidMotor" title="Bomba de Solucion Acida" value={motor1} isFetching={isFetchingStatus} />
    </div>
    <div className="column is-half-desktop">
      <Motor motorId="baseMotor" title="Bomba de Solucion Alcalina" value={motor2} isFetching={isFetchingStatus} />
    </div>
  </div>
);

export default Motors;
