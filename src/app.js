import axios from "axios";

const countryTitle = document.getElementById('country-title');
const countryInfo = document.getElementById('country-info');
const countryOutput = document.getElementById('country-output');
const submitForm = document.getElementById( 'submit-form' );
const searchField = document.getElementById('search-field');
const warning = document.getElementById('warning');

warning.innerText = `Search for a country first! The information of your country will be displayed here.`


async function getCountries(search) {
    // warning leegmaken voor het zoeken
    warning.innerText = "";

    try {
        const response = await axios.get(`https://restcountries.com/v2/name/${search}`);
        const data = response.data[0];
        console.log(data);

        countryTitle.innerHTML = `<span><img src="${data.flag}"/></span> ${data.name}`
        countryInfo.innerText = `${data.name} is situated in ${data.subregion}. It has a population of ${data.population} people. The capital is ${data.capital} ${getCurrency(data.currencies)}. ${getLanguage(data.languages)}.`;

    } catch (e) {
        //console.error(e);
        warning.innerText = `Search for an existing country`;
    }
}

function getCurrency(data) {
    let currencyMessage = `and you can pay with `;
    if(data.length === 2) {
        return currencyMessage + `${data[0].name}'s and ${data[1].name}'s`;
    }
    return currencyMessage + `${data[0].name}'s`;
}

function getLanguage(data) {
    let languageMessage = `They speak `;
    if(data.length === 2) {
        return languageMessage + `${data[0].name} and ${data[1].name}`;
    }
    if(data.length === 3) {
        return languageMessage + `${data[0].name}, ${data[1].name} and ${data[2].name}`;
    }
    if(data.length === 4) {
        return languageMessage + `${data[0].name}, ${data[1].name}, ${data[2].name}, and ${data[3].name}`;
    }
    if(data.length > 4) {
        return languageMessage + `${data[0].name}, ${data[1].name}, ${data[2].name}, ${data[3].name} and even more languages!`;
    }
    return languageMessage + `${data[0].name}`;
}

// Button event listener + aanroep getCountries
submitForm.addEventListener( 'submit', function ( event ) {
    event.preventDefault();
    countryTitle.innerHTML = null;
    countryInfo.innerText = null;
    void getCountries(searchField.value)
    searchField.value = '';
} );
