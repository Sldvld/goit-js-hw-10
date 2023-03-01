import './css/styles.css';

const input = document.querySelector('#search-box');
console.log(input);
input.addEventListener('input', onInput)
function onInput(ev) {
    
}
console.log(onInput);

const DEBOUNCE_DELAY = 300;
