import React from 'react';

class WifiModal extends React.Component {
  constructor() {
    super();
    this.handleChangePwd = this.handleChangePwd.bind(this);
  }

  handleChangePwd(ev) {
    const { selectedWifi, changePwd } = this.props;
    changePwd({ ...selectedWifi, pwd: ev.target.value });
  }

  render() {
    const { handleClose, selectedWifi, handleConnect } = this.props;
    return (
      <div className="modal is-active">
        <div className="modal-background" onClick={handleClose} />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Conectarse a la red WiFi</p>
            <button className="delete" aria-label="close" onClick={handleClose} />
          </header>
          <section className="modal-card-body">
            <div className="field">
              <label className="label is-medium">Password para: <span className="tag is-info is-medium">{selectedWifi.ssid}</span></label>
              <p className="control has-icons-left">
                <input className="input is-medium" type="password" placeholder="Password" onChange={this.handleChangePwd} />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock" />
                </span>
              </p>
            </div>
          </section>
          <footer className="modal-card-foot has-text-right">
            <button className="button is-primary" onClick={handleConnect}>Conectar</button>
            <button className="button" onClick={handleClose}>Cancelar</button>
          </footer>
        </div>
      </div>
    )
  }
}

export default WifiModal;
