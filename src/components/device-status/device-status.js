import React from 'react';
import Process from './process';

const Online = ({ online }) => (online ?
  <i className="fas fa-check-circle" /> :
  <i className="fas fa-times" />);

const Find = ({ findDevice, online, isFetching }) => (
  <a className={`button is-info ${online ? 'is-invisible' : ''}`} onClick={findDevice} disabled={isFetching}>
    <span className="icon is-small">
      <i className={`fas fa-sync-alt ${isFetching ? 'fa-spin' : ''}`} />
    </span>
  </a>
);

const ConfigButton = ({ toggleView, view, taskRunning }) => (
  <a
    className={`button ${view !== 'main' ? 'is-info' : ''} ${taskRunning ? 'is-loading' : ''}`}
    onClick={toggleView}
    role="button"
  >
    <span className="icon">
      <i className="fas fa-cogs fa-x2" />
    </span>
  </a>
);

const Connected = ({
  online,
  isFetching,
  findDevice,
  toggleView,
  view,
  taskRunning
}) => (
  <div>
    <span className="subtitle is-4 has-text-grey-dark" style={{ marginRight: 10 }}>Dispositivo:</span>
    {!online && <Find findDevice={findDevice} online={online} isFetching={isFetching} />}
    <span className={`icon is-medium ${online ? 'has-text-success' : 'has-text-gray'}`} style={{ marginRight: 10, marginLeft: 10 }}>
      <Online online={online} />
    </span>
    <span className="subtitle is-5 has-text-grey-dark">
      {online ? 'En línea' : 'Desconectado'}
    </span>
    <span style={{ marginLeft: 10 }}>
      {online && <ConfigButton
        toggleView={toggleView}
        view={view}
        taskRunning={taskRunning}
      />}
    </span>
  </div>
);

class DeviceStatus extends React.Component {
  constructor() {
    super();
    this.toggleView = this.toggleView.bind(this);
  }

  componentDidMount() {
    const { findDevice } = this.props;
    findDevice();
  }

  toggleView() {
    const { view, resetView, changeView } = this.props;
    if (view !== 'main') {
      return resetView;
    }

    return () => changeView('config');
  }

  render() {
    const {
      online,
      isFetching,
      findDevice,
      requestNewTask,
      requestStopTask,
      task,
      view,
      resetView,
    } = this.props;
    return (
      <div className="columns is-tablet">
        <div className="column is-one-half-tablet">
          <Connected
            online={online}
            isFetching={isFetching}
            findDevice={() => {
              if (!isFetching) {
                findDevice();
              }
            }}
            toggleView={this.toggleView()}
            view={view}
            taskRunning={task.running}
          />
        </div>
        {
          online &&
          <Process requestNewTask={requestNewTask} requestStopTask={requestStopTask} task={task} />
        }
      </div>
    );
  }
}

export default DeviceStatus;
