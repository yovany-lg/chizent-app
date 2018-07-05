const defaults = {
  type: 'line',
  options: {
    responsive: true,
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
    scales: {
      yAxes: [{
        display: true,
        // scaleLabel: {
        //   display: true,
        //   labelString: 'Valor',
        // },
        ticks: {
          beginAtZero: true,
        },
      }],
    },
  },
};

export const lineChartConfig = (values, labels, title, color) => ({
  ...defaults,
  data: {
    labels,
    datasets: [{
      label: title,
      backgroundColor: color,
      borderColor: color,
      data: values,
      fill: false,
    }],
  },
});

const donutDefaults = {
  type: 'doughnut',
  options: {
    borderWidth: [50, 50],
    responsive: true,
    legend: {
      display: false,
    },
    cutoutPercentage: 85,
    rotation: -1.5 * Math.PI,
  },
};

export const donutChartConfig = (values, color) => ({
  ...donutDefaults,
  data: {
    labels: [
      'Velocidad',
      '',
    ],
    datasets: [
      {
        data: values,
        backgroundColor: [
          color,
        ],
        hoverBackgroundColor: [
          color,
        ],
      }],
  },
});
