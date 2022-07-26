// Load Dark Mode Settings

// Get Colors From CSS Variables
const getColorVariable = color =>
  getComputedStyle(document.documentElement)
    .getPropertyValue(`--color-${color}`)
    .trim();

const colorPrimary = getColorVariable('primary');
const colorAccent = getColorVariable('accent');
const colorDefault = getColorVariable('default');
const colorCard = getColorVariable('card');
const colorBorder = getColorVariable('border');
const colorLabel = getColorVariable('label');
const colorGrey = getColorVariable('grey');

// Create chart function
const createChart = (selector, options) => {
  const ctx = document.getElementById(selector).getContext('2d');
  const chart = new Chart(ctx, options);
  return [ctx, chart];
};

// Abbreviate long number function
const abbreviateLongNumber = n => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K';
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M';
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B';
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T';
};

// Get Data From API
const category = 'en:beverages'; // Change category
const getWorldProducts = async () => {
  try {
    const res = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=categories&tag_contains_0=contains&tag_0=${category}&json=true&sort_by=brands&page_size=6`
    );
    const data = await res.json();

    const { count } = data;

    document.querySelector('#totalWorldProducts').innerHTML =
      abbreviateLongNumber(count);
    document.querySelector('#preloader').classList.remove('drinks-loading');

    console.log('count ', count);
  } catch (error) {
    console.log('Error', error);
  }
};
getWorldProducts();

const getNoProducts = async () => {
  try {
    const res = await fetch(
      `https://no.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=categories&tag_contains_0=contains&tag_0=${category}&json=true&sort_by=brands&page_size=6`
    );
    const data = await res.json();

    const { count } = data;

    document.querySelector('#totalNoProducts').innerHTML =
      abbreviateLongNumber(count);

    // document.querySelector('#preloader').classList.remove('drinks-loading');

    console.log('count ', count);
  } catch (error) {
    console.log('Error', error);
  }
};
getNoProducts();

// Chart default options
const defaultOptions = {
  type: 'bar',
  data: {},
  options: {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        usePointStyle: true,
        callback: {
          labelPointStyle: () => ({
            pointStyle: 'circle',
          }),
        },
        caretSize: 0,
        padding: 12,
        bodyFont: {
          family: 'Sora',
          size: 12,
          weight: 400,
        },
        footerFont: {
          family: 'Sora',
          size: 12,
          weight: 400,
        },
        titleFont: {
          family: 'Sora',
          size: 12,
          weight: 400,
        },
      },
    },

    scales: {
      y: {
        display: false,
      },
      x: {
        display: false,
      },
    },
  },
};

// Bar Figure Chart

const barRes = axios
  .get(
    `https:/no.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=categories&tag_contains_0=contains&tag_0=${category}&json=true&sort_by=brands&page_size=6`
  )
  .then(function (response) {
    const { data } = response;
    const { products } = data;

    const labels = products.map(product => product.brands);

    const barData1 = [],
      barData2 = [];

    products.forEach(product => {
      const languages = product.languages_tags.length,
        ingredients = product.ingredients.length;

      barData1.push(languages);
      barData2.push(ingredients);
    });

    const barOptions = {
      ...defaultOptions,
      data: {
        ...defaultOptions.data,
        labels,
        datasets: [
          {
            label: 'Languages',
            data: barData1,
            backgroundColor: ['#df8420'],
            hoverBackgroundColor: ['#df8420'],
            borderColor: ['#df8420'],
            borderWidth: 1,
            barThickness: 12,
            borderRadius: 6,
          },
          {
            label: 'Ingredients',
            data: barData2,
            backgroundColor: ['#fff'],
            hoverBackgroundColor: ['#fff'],
            borderColor: ['#fff'],
            borderWidth: 1,
            barThickness: 12,
            borderRadius: 6,
          },
        ],
      },
    };

    const barFigureChart = createChart('figureBarChart', barOptions);
  })
  .catch(function (error) {
    console.log(error);
  });

// Area Table Chart
const data2022 = [
  700000, 140000, 300000, 2500000, 500000, 1200000, 400000, 1100000, 600000,
];
const data2021 = [
  500000, 120000, 400000, 900000, 600000, 2300000, 360000, 1800000, 500000,
];

const areaTableOptions = {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        backgroundColor: colorPrimary,
        borderColor: colorPrimary,
        hoverBackgroundColor: colorPrimary,
        label: '',
        fill: true,
        data: data2022,
      },
    ],
  },
  options: {
    ...defaultOptions.options,
    elements: {
      point: {
        radius: 8,
        hoverRadius: 8,
        borderWidth: 0,
      },
    },
    plugins: defaultOptions.options.plugins,
    tension: 0.3,
    scales: {
      x: {
        display: false,
      },
      y: {
        suggestedMax: 3500000,
        suggestedMin: 0,
        ticks: {
          font: {
            family: 'Sora',
            size: 10,
          },
          callback: value => abbreviateLongNumber(value),
        },
        grid: {
          drawBorder: true,
          drawOnChartArea: true,
          drawTicks: true,
          color: colorBorder,
          borderColor: 'transparent',
          borderDash: [5, 5],
          borderDashOffset: 2,
          tickColor: 'transparent',
        },
      },
    },
  },
};
const [areaChartCtx, areaChart] = createChart(
  'areaTableChart',
  areaTableOptions
);

const gradient = areaChartCtx.createLinearGradient(0, 0, 0, 220);
gradient.addColorStop(0, 'rgba(0,0,0, 0.2)');
gradient.addColorStop(0.8, 'rgba(0,0,0,0)');

areaChart.data.datasets[0].backgroundColor = gradient;
areaChart.update();

const selectYear = (element, year) => {
  // Style the buttons over chart
  const buttons = document.querySelectorAll('.card-header button');
  buttons.forEach(button => {
    button.classList.remove('active');
  });
  element.classList.add('active');

  // Update data in the chart
  areaChart.data.datasets[0].data = year === 2022 ? data2022 : data2021;
  areaChart.update();
};

// Get paged table

// Radial Bar Card

// Dark Mode Toggle
