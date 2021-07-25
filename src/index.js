import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import countryListTemplate from './templates/country-list.hbs';
import countryInfoTemplate from './templates/country-info.hbs';
import _ from 'lodash';
const DEBOUNCE_DELAY = 300;
let name = '';
let dataCountries = [];
const searchBox = document.querySelector("#search-box")
 
const countryList = document.querySelector(".country-list");

const countryInfo = document.querySelector(".country-info");

searchBox.addEventListener('input', _.debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(event) {
   console.log(event);
   name = event.target.value;
   console.log(name);
   fetchCountries(name)
      .then((countries) => {
         dataCountries = [...countries];
         renderCountry(dataCountries);
      });
};

function renderCountry(dataCountries) {
   console.log(dataCountries);
   if (dataCountries.length === 1) {
      countryInfo.innerHTML = countryInfoTemplate(dataCountries);
      countryList.remove();
   } else if (dataCountries.length > 1) {
      countryList.innerHTML = countryListTemplate(dataCountries);
      if (dataCountries.length > 10) {
         Notiflix.Notify.Info('Too many matches found. Please enter a more specific name.');
      };
      console.log(dataCountries.length);
   }
};