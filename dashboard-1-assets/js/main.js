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
    zoom: {
      enabled: false,
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
    active: {
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
      data: [12, 24, 15, 47, 15],
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
      columnWidth: '60%',
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
const gaugeChartOptions = {
  series: [
    {
      name: 'Using',
      data: [24],
    },
    { name: 'Unused', data: [12] },
  ],
  ...defaultOptions,

  chart: {
    ...defaultOptions.chart,
    type: 'bar',
    stacked: true,
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
    categories: ['', '', ''],
    labels: {
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
renderChart(gaugeChartOptions, 'gauge-chart');

// Create area chart
const areaChartOptions = {
  ...defaultOptions,
  series: [
    {
      name: 'Series 1',
      data: [10, 25, 40, 60, 80, 60, 50, 30],
    },
    {
      name: 'Series 2',
      data: [5, 20, 35, 20, 60, 25, 40, 17],
    },
  ],
  chart: {
    ...defaultOptions.chart,
    type: 'area',
    height: 240,
  },

  colors: [colorDefault, colorPrimary],
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 0.05,
      opacityFrom: 0.1,
      opacityTo: 1,
      stops: [0, 90, 100],
    },
  },

  grid: {
    strokeDashArray: 3,
    borderColor: 'rgba(255,255,255,0.05)',
    padding: { left: 20, right: 20, top: 0, bottom: -8 },
  },
  stroke: {
    show: true,
  },
  markers: {
    size: 0,
    colors: undefined,
    strokeColors: colorCard,
    strokeWidth: 1,
    strokeOpacity: 0.5,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    shape: 'circle',
    hover: {
      size: undefined,
      sizeOffset: 6,
    },
  },
  yaxis: {
    max: 100,
    tickAmount: 5,
    labels: {
      style: {
        fontFamily: 'Sora',
        colors: colorLabel,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    crosshairs: {
      show: true,
      stroke: {
        color: '#rgba(255,255,255, 0.25)',
        width: 1,
        dashArray: 2,
      },
      dropShadow: {
        enabled: false,
      },
      fill: {
        type: 'solid',
        color: '#b1b9c4',
      },
      position: 'front',
    },
  },
};

renderChart(areaChartOptions, 'area-chart');

// Create line Chart
