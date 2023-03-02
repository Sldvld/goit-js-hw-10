import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import notiflix from 'notiflix'
import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('country-info');

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));


function onInput(evt) {
    const countryName = evt.target.value.trim();
    console.log(countryName);
    if(countryName === "") {
        countryList.innerHTML = '';
        countryName.innerHTML = '';
    return;
    }
    fetchCountries(countryName)
    .then(renderCountries)
    .catch(onFetchError);
}
function renderCountries(countryName) {
    const markup = countryName.map(({name, flags}) => {
        return `<li><img src="${flags.svg}" alt="${flags.alt}"width="30" height="20"><span>${name.official}</span></li>`;
    }).join("");
    countryList.innerHTML = markup;
}

function onFetchError() {

}