import React, { Fragment as Fr } from 'react';
import AvailableWifis from './available-wifis';
import WifiModal from './wifi-modal';
import CalibrateModal from './calibrate-modal';

const Header = ({
  ip,
  hostname,
  isFetching,
  createAP,
  shutdown,
  handleFetchWifis,
  calibrate
}) => (
  <div className="columns is-desktop is-centered">
    <div className="column is-one-third">
      <a
        className="button is-link"
        onClick={calibrate}
      >
        <span>Calibración</span>
        <span className="icon">
          <i className="fas fa-prescription-bottle" />
        </span>
      </a>
    </div>
    <div className="column is-one-third">
      <div className="buttons is-centered">
        <a
        className={`button is-link ${isFetching ? 'is-loading' : ''}`}
        onClick={handleFetchWifis}
        >
          <span className="icon">
            <i className="fas fa-wifi fa-lg" />
          </span>
        </a>
        <a className="button is-link" onClick={createAP}>Access Point</a>
        <a className="button is-danger" onClick={shutdown}>
          <span className="icon">
            <i className="fas fa-power-off fa-lg" />
          </span>
        </a>
      </div>
    </div>
  </div>
);

class App extends React.Component {
  constructor() {
    super();
    this.handleConnect = this.handleConnect.bind(this);
    this.handleFetchWifis = this.handleFetchWifis.bind(this);
    this.wifiSelector = this.wifiSelector.bind(this);
    this.handleCreateAP = this.handleCreateAP.bind(this);
    this.handleShutdown = this.handleShutdown.bind(this);
    this.handleNextStep = this.handleNextStep.bind(this);
    this.requestCal = this.requestCal.bind(this);
  }

  componentWillMount() {
    this.handleFetchWifis();
  }

  handleNextStep() {
    const { calibrateNextStep } = this.props;
    console.log('Next Step');
    calibrateNextStep();
  }

  handleFetchWifis() {
    const { fetchWifis, ip } = this.props;
    // console.log('fetching');
    fetchWifis(ip);
  }

  handleConnect() {
    const { selectedWifi, connectWifi, ip } = this.props;
    connectWifi(ip, selectedWifi);
  }

  wifiSelector(wifi) {
    const { selectWifi } = this.props;
    return () => selectWifi(wifi);
  }

  handleCreateAP() {
    const { ip, createAP } = this.props;
    createAP(ip);
  }

  handleShutdown() {
    const { ip, shutdown } = this.props;
    shutdown(ip);
  }

  requestCal() {
    const { calibrate: { calPoint }, requestCalibration } = this.props;
    console.log('Requesting CalPoint:', calPoint);
    requestCalibration(calPoint);
  }

  render() {
    const {
      wifis,
      isFetching,
      selectedWifi,
      selectWifi,
      changePwd,
      ip,
      resetWifi,
      createAP,
      shutdown,
      calibrate,
      calibrateReset,
      requestCalibration,
    } = this.props;
    // if (calibrate.completed) {
    //   window.alert('Calibración Exitosa!');
    // }
    // console.log('Kit:', this.props);
    return (
      <Fr>
        <Header
          ip={ip}
          isFetching={isFetching}
          handleFetchWifis={this.handleFetchWifis}
          calibrate={this.handleNextStep}
          createAP={this.handleCreateAP}
          shutdown={this.handleShutdown}
        />
        <AvailableWifis
          wifis={wifis}
          loading={isFetching}
          wifiSelector={this.wifiSelector}
        />
        {
          selectedWifi && <WifiModal
            selectedWifi={selectedWifi}
            changePwd={changePwd}
            handleConnect={this.handleConnect}
            handleClose={resetWifi}
          />
        }
        {
          calibrate.step !== 0 && <CalibrateModal
            step={calibrate.step}
            completed={calibrate.completed}
            fetching={calibrate.fetching}
            nextStep={this.handleNextStep}
            reset={calibrateReset}
            request={this.requestCal}
          />
        }
      </Fr>
    );
  }
}

export default App;
