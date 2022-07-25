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

// Get total uk products

// Get drinks

// Bar Figure Chart

// Area Table Chart

// Get paged table

// Radial Bar Card

// Dark Mode Toggle
