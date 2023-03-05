import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
    const countryName = evt.target.value.trim();

        if(countryName === '') {
            clearTpl()
        return;
    }
    fetchCountries(countryName)
    .then(countryName => {
        if (countryName.length > 10) {
            Notify.info(
                'Too many matches found. Please enter a more specific name.'
            );
        clearTpl()
        return;
    }
    renderTpl(countryName);
    })
    .catch (error => {
        clearTpl()
            Notify.warning(
                'Oops, there is no country with that name'
            );
    });
};

function renderTpl(countryName) {
        clearTpl();

    if (countryName.length === 1) {
        const markup = countryName.map(({name, flags, capital, population, languages}) => {
            return `<div class="country-card"><img 
            src='${flags.svg}' 
            alt='${name.official}' 
            width="120" 
            height="80">
            <h2 class="country-info__header">
            ${name.official}
            </h2>
            <ul>
            <li>
            <span>Capital:</span>
            ${capital}
            </li>
            <li>
            <span>Population:</span>
            ${population}
            </li>
            <li>
            <span>Languages:</span>
            ${Object.values(languages)}
            </li>
            </ul>
            </div>
            `;
        }).join();
        countryInfo.innerHTML = markup;
    }
    else{
        const markup = countryName.map(({name, flags}) => {
            return `<li class="country-list__item">
            <img src="${flags.svg}" 
            alt="${flags.alt}
            "width="30" 
            height="20">
            <span>${name.official}</span>
            </li>`;
        }).join("");
        countryList.innerHTML = markup;
    }
};

function clearTpl() {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
}