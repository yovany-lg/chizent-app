import React from 'react';
import ProcessForm from './process-form';

const ProcessButton = ({ openModal }) => (
  <div className="column is-one-third has-text-right">
    <a className="button is-info" onClick={openModal}>
      <span className="icon is-small">
        <i className="fas fa-plus" />
      </span>
      <span>Nuevo Proceso</span>
    </a>
  </div>
);

const TaskDescription = ({ task }) => (
  <div className="column is-one-third dropdown is-hoverable">
    <div className="dropdown-trigger">
      <a className="button">
        <span className="icon is-small">
          <i className="fas fa-info-circle" />
        </span>
      </a>
    </div>
    <div className="dropdown-menu" id="dropdown-menu4" role="menu">
      <div className="dropdown-content has-text-left">
        <div className="dropdown-item has-text-left">
          <p><strong>pH:</strong> {task.phValue}</p>
        </div>
        <div className="dropdown-item has-text-left">
          <p><strong>Temp:</strong> {task.tempValue} [°C]</p>
        </div>
        <div className="dropdown-item has-text-left">
          <p><strong>Tiempo:</strong> {task.time} minutos</p>
        </div>
      </div>
    </div>
  </div>
);

const EndTask = ({ requestStopTask, task }) => (
  <div className="column is-one-quarter has-text-right">
    <div className="columns has-text-right">
      <TaskDescription task={task} />
      <div className="column is-half has-text-right">
        <a className="button is-warning" onClick={requestStopTask}>
          <span className="icon is-small">
            <i className="fas fa-times" />
          </span>
          <span>Detener</span>
        </a>
      </div>
    </div>
  </div>
);

const validInputs = phValue =>
  phValue && (phValue >= 0 && phValue <= 14);

class NewProcess extends React.Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      phValue: 7,
      time: 10,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.changePh = this.changePh.bind(this);
    this.changeTime = this.changeTime.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
  }

  sendRequest() {
    const { requestNewTask } = this.props;
    const { phValue, time } = this.state;
    if (validInputs(phValue)) {
      requestNewTask(phValue, time);
      this.closeModal();
    }
  }
  openModal() {
    this.setState({ modal: true });
  }
  closeModal() {
    this.setState({ modal: false });
  }
  changePh({ target: { value } }) {
    // const { phValue, tempValue } = this.state;
    this.setState({ phValue: value });
  }
  changeTime({ target: { value } }) {
    // const { phValue, tempValue } = this.state;
    this.setState({ time: value });
  }

  render() {
    const { modal, phValue, time } = this.state;
    const { task, requestStopTask } = this.props;
    // const { requestNewTask }
    // console.log('state:', this.state);
    return (
      <React.Fragment>
        {
          task.running ?
            <EndTask requestStopTask={requestStopTask} task={task} /> :
            <ProcessButton openModal={this.openModal} />
        }
        <ProcessForm
          isOpen={modal}
          close={this.closeModal}
          phValue={phValue}
          // tempValue={tempValue}
          time={time}
          valid={validInputs(phValue)}
          sendRequest={this.sendRequest}
          changePh={this.changePh}
          changeTime={this.changeTime}
        />
      </React.Fragment>
    );
  }
}

export default NewProcess;
