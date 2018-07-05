import React from 'react';
import Chart from 'chart.js';
import { donutChartConfig } from './config-generator';
import { chartColors } from '../../assets/charts';

const getValues = value => [value, 100 - value];

class MotorInfo extends React.Component {
  componentDidMount() {
    const { motorId, value } = this.props;
    const values = getValues(value);
    this.config = donutChartConfig(values, chartColors.orange);
    this.myChart = new Chart(
      document.getElementById(`${motorId}-chart`),
      this.config,
    );
  }

  componentWillReceiveProps({ value }) {
    this.config.data.datasets[0].data = getValues(value);
    this.myChart.update();
  }

  render() {
    const { motorId, title, value } = this.props;
    return (
      <div>
        <div
          style={{
            width: '100%',
            // height: '100px',
            position: 'absolute',
            top: '50%',
            marginTop: '-10px',
            // lineHeight: '19px',
            textAlign: 'center',
            // zIndex: 999999999999999
          }}
        >
          <p className="subtitle has-text-gray-dark is-size-2">
            {`${value} %`}
          </p>
        </div>
        <canvas id={`${motorId}-chart`} />
      </div>
    );
  }
}

MotorInfo.defaultProps = {
  title: 'Bomba de Solucion Ácida',
  value: 0,
};

export default MotorInfo;
