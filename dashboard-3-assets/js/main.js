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

// Get total uk products
const getUKProducts = async () => {
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
getUKProducts();

// Get drinks

// Bar Figure Chart
const barFigureChartCtx = document
  .getElementById('figureBarChart')
  .getContext('2d');
const barFigureChart = new Chart(barFigureChartCtx, {
  type: 'bar',
  data: {
    labels: ['Gatorade', 'Pepsi', 'Red Bull', 'Monster', 'Coca Cola', 'Sprite'],
    datasets: [
      {
        label: '2021',
        data: [50, 140, 95, 80, 200, 95],
        backgroundColor: [colorAccent],
        hoverBackgroundColor: [colorAccent],
        borderColor: [colorAccent],
        borderWidth: 1,
        barThickness: 12,
        borderRadius: 6,
      },
      {
        label: '2022',
        data: [85, 160, 140, 98, 270, 75],
        backgroundColor: ['#fff'],
        hoverBackgroundColor: ['#fff'],
        borderColor: ['#fff'],
        borderWidth: 1,
        barThickness: 12,
        borderRadius: 6,
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        usePointStyle: true,
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
});

// Area Table Chart

// Get paged table

// Radial Bar Card

// Dark Mode Toggle
