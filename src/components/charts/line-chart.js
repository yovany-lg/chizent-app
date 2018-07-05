import React from 'react';
import Chart from 'chart.js';
import { chartColors } from '../../assets/charts';
import { lineChartConfig } from './config-generator';

class LineChart extends React.Component {
  componentDidMount() {
    const { sensor, values, labels, color, title } = this.props;
    const ctx = document.getElementById(sensor).getContext('2d');
    this.config = lineChartConfig(values, labels, title, chartColors[color])
    this.myChart = new Chart(ctx, this.config);
  }

  componentWillReceiveProps({ labels, values }) {
    // console.log('newProps:', newProps);
    this.config.data.labels = labels || [];
    this.config.data.datasets[0].data = values || [];
    this.myChart.update();
  }

  render() {
    const { sensor } = this.props;
    return (<canvas id={sensor} height="180" />);
  }
}

export default LineChart;
