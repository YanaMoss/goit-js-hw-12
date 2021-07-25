'use strict';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import countryListTemplate from './templates/country-list.hbs';
import countryInfoTemplate from './templates/country-info.hbs';
import _, { divide } from 'lodash';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
let name = '';
let dataCountries = [];
const searchBox = document.querySelector("#search-box")
const countryInfo = document.querySelector(".country-info");
window.onload = () => {
   searchBox.addEventListener('input', _.debounce(searchCountry, DEBOUNCE_DELAY));

   function searchCountry(event) {
      event.preventDefault();
      name = event.target.value;
      fetchCountries(name)
         .then((response) => {
            if (response.status === 404) {
               throw new Error('Oops, there is no country with that name.');
            }
            dataCountries = [...response];
            renderCountry(dataCountries);
         })
         .catch((err) => {
            Notiflix.Notify.Failure(err.message);
         })
   };

   function renderCountry(dataCountries) {
      if (dataCountries.length > 10) {
         Notiflix.Notify.Info('Too many matches found. Please enter a more specific name.');
      } else if (dataCountries.length === 1) {
         countryInfo.innerHTML = countryInfoTemplate(dataCountries);
      } else {
         countryInfo.innerHTML = countryListTemplate(dataCountries);
      }
   };
};
