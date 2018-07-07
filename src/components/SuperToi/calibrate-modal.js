import React from 'react';

const Completed = ({ nextStep }) => {
  setTimeout(() => {
    nextStep();
  }, 2000);
  return (
    <div className="modal is-active">
      <div className="modal-background" />
      <div className="modal-content">
        <div className="notification is-primary">
          <span className="is-size-4">
            Calibración Exitosa!
          </span>
        </div>
      </div>
    </div>
  );
};

const CalibrateModal = ({ reset, step, request, fetching }) => (
  <div className="modal is-active">
    <div className="modal-background" />
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Calibración del Sensor de pH</p>
        <button className="delete" aria-label="close" onClick={reset} />
      </header>
      <section className="modal-card-body">
        <div className="notification">
          <ol>
            <li>Para calibrar el sensor de pH tenga a la mano las muestras.</li>
            <li>Limpie la sonda antes de introducirla a la muestra para no contaminarlas.</li>
            <li>Introduzca la sonda en la muestra correspondiente.</li>
            <li>La calibración se puede realizar usando una, dos o tres muestras.</li>
            <li>
              Para obtener mediciones más exactas se recomienda calibrar
              usando las tres muestras.
            </li>
          </ol>
        </div>

        <div className="has-text-centered">
          <div className="field">
            <a
              className={
                `button is-large ${step !== 1 ? 'is-dark' : 'is-primary'} ${step === 1 && fetching ? 'is-loading' : ''}`
              }
              onClick={() => {
                if(step === 1) {
                  request()
                }
              }}
              disabled={step !== 1}
            >
              <span className="is-size-3">pH 7</span>
              <span className="icon">
                <i className="fas fa-prescription-bottle fa-lg"></i>
              </span>
            </a>
          </div>
          <div className="field">
            <a
              className={
                `button is-large ${step !== 2 ? 'is-dark' : 'is-danger'} ${step === 2 && fetching ? 'is-loading' : ''}`
              }
              onClick={() => {
                if(step === 2) {
                  request()
                }
              }}
              disabled={step !== 2}
            >
              <span className="is-size-3">pH 4</span>
              <span className="icon">
                <i className="fas fa-prescription-bottle fa-lg"></i>
              </span>
            </a>
          </div>
          <div className="field">
            <a
              className={
                `button is-large ${step !== 3 ? 'is-dark' : 'is-link'} ${step === 3 && fetching ? 'is-loading' : ''}`
              }
              onClick={() => {
                if(step === 3) {
                  request()
                }
              }}
              disabled={step !== 3}
            >
              <span className="is-size-3">pH 10</span>
              <span className="icon">
                <i className="fas fa-prescription-bottle fa-lg"></i>
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  </div>
);

const MainComponent = ({
  nextStep,
  reset,
  step,
  request,
  completed,
  fetching
}) => (completed ?
  <Completed nextStep={nextStep} /> :
  <CalibrateModal reset={reset} step={step} request={request} fetching={fetching} />);

export default MainComponent;
