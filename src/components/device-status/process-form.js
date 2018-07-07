import React from 'react';

const Form = ({
  changePh,
  // changeTemp,
  phValue,
  tempValue,
  time,
  changeTime
}) => (
  <div>
    <p className="subtitle is-4 is-spaced">Variables de control</p>
    <div className="field">
      <label className="label">Nivel de pH</label>
      <div className="control">
        <input
          className="input"
          type="number"
          placeholder="7.0"
          step="0.1"
          min="0"
          max="14"
          value={phValue || 7}
          onChange={changePh}
        />
      </div>
    </div>

    <div className="field">
      <label className="label">Duración [min]</label>
      <div className="control">
        <input
          className="input"
          type="number"
          placeholder="20.0"
          step="1"
          min="0"
          max="60"
          value={time || 10}
          onChange={changeTime}
        />
      </div>
    </div>
  </div>
);

const ProcessForm = ({
  isOpen,
  close,
  phValue,
  time,
  changePh,
  changeTime,
  sendRequest,
  valid
}) => (
  <div className={`modal ${isOpen ? 'is-active' : ''}`}>
    <div className="modal-background" />
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Iniciar Nuevo Proceso</p>
        <button className="delete" aria-label="close" onClick={close} />
      </header>
      <section className="modal-card-body">
        <Form
          phValue={phValue}
          time={time}
          changePh={changePh}
          changeTime={changeTime}
        />
      </section>
      <footer className="modal-card-foot">
        <button className="button is-success" disabled={!valid} onClick={sendRequest}>Iniciar</button>
        <button className="button" onClick={close}>Cancelar</button>
      </footer>
    </div>
  </div>
);

export default ProcessForm;
