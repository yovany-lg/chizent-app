import React from 'react';
import DeviceStatus from '../../containers/device-container';
import SuperToi from '../../containers/super-toi-container';
import SensorsContainer from '../../containers/sensors-container';
import Motors from '../../containers/motors-container';

const renderView = (view) => {
  switch (view) {
    case 'main':
      return <MainView />;
    case 'config':
      return <SuperToi />;
    default:
      return false;
  }
};

const MainView = () => (
  <React.Fragment>
    <SensorsContainer />
    <Motors />
  </React.Fragment>
);

const Dashboard = ({ online, view, changeView, resetView }) => (
  <div>
    <DeviceStatus view={view} changeView={changeView} resetView={resetView} />
    {renderView(view)}
  </div>
);

export default Dashboard;
