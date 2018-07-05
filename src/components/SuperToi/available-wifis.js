import React from 'react';

// const wifiList = [
//   { ssid: 'Mayitos', address: 'asdlqijwdlkmq', quality: 60 },
//   { ssid: 'Mayitos2', address: 'as;dknl', quality: 40 },
// ];

const Wifi = ({ wifi, selectWifi }) => (
  <tr>
    <th className="has-text-centered">{wifi.ssid}</th>
    <td className="has-text-centered">{wifi.quality}</td>
    <td className="has-text-centered">
      <a className="button is-primary" onClick={selectWifi}>
        <span className="icon is-small">
          <i className="fas fa-sign-in-alt" />
        </span>
      </a>
    </td>
  </tr>
);

const WifiList = ({ wifis, wifiSelector }) => (
  <table className="table is-striped is-fullwidth">
    <thead>
      <tr>
        <th className="has-text-centered">Red</th>
        <th className="has-text-centered">Calidad</th>
        <th className="has-text-centered">Conectar</th>
      </tr>
    </thead>
    <tbody>
      {
        wifis.map(wifi => (
          <Wifi key={wifi.address} wifi={wifi} selectWifi={wifiSelector({ ssid: wifi.ssid })} />
        ))
      }
    </tbody>
  </table>
);

const AvailableWifis = ({ wifis, loading, wifiSelector }) => (
  <div className="has-text-centered" style={{ marginTop: 10 }}>
    <h1 className="title has-text-grey-dark">Redes WiFi disponibles</h1>
    <div className="columns is-centered">
      <div className="column is-two-thirds has-text-centered">
        {!loading ? <WifiList wifis={wifis} wifiSelector={wifiSelector} /> : (
          <span className="icon has-text-gray is-large" style={{ marginLeft: 10 }}>
            <i className="fas fa-spinner fa-spin fa-2x" />
          </span>
        )}
      </div>
    </div>
  </div>
);

export default AvailableWifis;
