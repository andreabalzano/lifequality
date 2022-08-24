import { findCity } from './app.js';
import { PAGE_ELEMENTS } from './obj.js';

//form submit event
PAGE_ELEMENTS.form.addEventListener('submit', async function(e){
    e.preventDefault();
    findCity();
});