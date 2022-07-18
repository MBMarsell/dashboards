// Get CSS Variables
const getColorVariable = color =>
  getComputedStyle(document.documentElement)
    .getPropertyValue(`--color-${color}`)
    .trim();

const colorPrimary = getColorVariable('primary');
const colorAccent = getColorVariable('accent');
const colorDefault = getColorVariable('default');
const colorCard = getColorVariable('card');
const colorLabel = getColorVariable('label');

// Render chart function
const renderChart = (options, id) => {
  const chart = new ApexCharts(document.querySelector(`#${id}`), options);
  chart.render();
};

// Declare Default Chart Options
const defaultOptions = {
  chart: {
    height: 136,
    width: '100%',
    toolbar: {
      show: false,
    },
  },

  tooltip: {
    enabled: true,
    fillSeriesColor: false,
    style: {
      fontFamily: 'Sora',
    },
  },
  legend: {
    show: false,
  },
  selection: {
    enabled: false,
  },
  //   States for hover
  states: {
    hover: {
      filter: {
        type: 'none',
      },
    },
  },
};

// Create sparklines bar chart
const sparklineBarOptions = {
  series: [
    {
      label: 'Series 1',
      data: [12, 24, 15, 47, 15, 58, 47, 78],
    },
  ],
  ...defaultOptions,

  chart: {
    type: 'bar',
    width: 80,
    height: 35,
    sparkline: {
      enabled: true,
    },
  },

  colors: [colorPrimary],
  plotOptions: {
    bar: {
      columnWidth: '80%',
    },
  },

  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  xaxis: {
    crosshairs: {
      width: 0,
    },
  },

  tooltip: {
    enabled: false,
  },
  selection: {
    enabled: true,
  },
};
// Render sparkline bar
renderChart(sparklineBarOptions, 'sparklines-bar');

// Create radial bar chart
const radialBarOptions = {
  ...defaultOptions,
  chart: {
    ...defaultOptions.chart,
    type: 'radialBar',
  },
  series: [33],
  labels: ['Usage'],
  colors: [colorPrimary],
  grid: {
    show: false,
    padding: { left: -30, right: -30, top: -15, bottom: -15 },
  },
  stroke: {
    lineCap: 'round',
  },
  plotOptions: {
    radialBar: {
      hollow: {
        size: '60%',
      },
      track: {
        background: '#363636',
      },
      dataLabels: {
        show: false,
      },
    },
  },
};
renderChart(radialBarOptions, 'radial-bar-chart');

// Create bar Chart
const barChartOptions = {
  series: [
    {
      name: 'Data 1',
      data: [24, 44, 30, 90, 30, 89, 68],
    },
    { name: 'Data 2', data: [12, 24, 15, 47, 15, 58, 47] },
  ],
  ...defaultOptions,

  chart: {
    ...defaultOptions.chart,
    type: 'bar',
  },

  colors: [colorPrimary, '#363636'],
  plotOptions: {
    bar: {
      columnWidth: '50%',
      //   borderRadius: 6, for rounded bars
    },
  },

  dataLabels: {
    enabled: false,
  },

  grid: {
    strokeDashArray: 3,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    padding: { left: 20, right: 20 },
  },

  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  yaxis: {
    show: false,
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    labels: {
      floating: true,
      style: {
        fontFamily: 'Sora',
        colors: colorLabel,
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },

    crosshairs: {
      show: false,
    },
  },
};
renderChart(barChartOptions, 'bar-chart');

// Create gauge Chart

// Create area chart

// Create line Chart
