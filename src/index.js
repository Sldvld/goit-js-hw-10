import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
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

    if (countryName.length >10) {
        Notify.info(
            'Too many matches found. Please enter a more specific name.'
        );
        countryList.innerHTML = '';
        countryName.innerHTML = '';
        return;
    }
    else if (countryName.length === 1) {
        const markup = countryName.map(({name, flags, capital, population, languages}) => {
            return `<img 
            src='${flags.svg}' 
            alt='${name.official}' 
            width="120" 
            height="80">
        <h1>
          ${name}
        </h1>
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
        `;
      }).join();
    countryInfo.innerHTML = markup;
    }
    else {
        const markup = countryName.map(({name, flags}) => {
            return `<li>
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
function onFetchError() {
    Notify.warning('Oops, there is no country with that name');
    }
    
    

// function renderCountryCard(countryName) {
//     const markup2 = countryName.map(({name, flags, capital, population, languages}) => {
//         return `<img 
//         src='${flags.svg}' 
//         alt='${name.official}' 
//         width="120" 
//         height="80">
//     <h1>
//       ${name}
//     </h1>
//     <ul>
//       <li>
//           <span>Capital:</span>
//           ${capital}
//       </li>
//       <li>
//           <span>Population:</span>
//           ${population}
//       </li>
//       <li>
//           <span>Languages:</span>
//           ${Object.values(languages)}
//       </li>
//     </ul>
//     `;
//   }).join();
//   countryInfo.innerHTML = markup2;
// }