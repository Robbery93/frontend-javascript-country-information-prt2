import axios from "axios";

async function getCountry() {
    try {
        const result = await axios.get(`https://restcountries.com/v2/name/greece`)
        const data = result.data[0];

        await createCountryElement(data);

    } catch (e) {
        console.log(e)
        if (e instanceof TypeError) {
            window.alert("Land niet gevonden");
        }
    }
}

const createCountryElement = (data) => {
    const countryElement = document.getElementById('country-element');
    const { name, subregion, population, capital, flag, currencies, languages } = data;

    countryElement.innerHTML = `
        <h1 id="country-name"><img src=${flag} alt="flag" class="flag" />${name}</h1>
        <div id="line"></div>
        <p>${name} is situated in ${subregion}. It has a population of ${population} people.</p>
        <p>The capital city is ${capital}, and you can pay with ${getCurrency(currencies)}.</p>
        <p>They speak ${getLanguages(languages)}.</p>
        `
}

const getCurrency = (currencies) => {
    let outcome = "";
    for (let i = 0; i < currencies.length; i++) {
        if (i === 0) {
            outcome = `${currencies[i].name}'s`;
        } else {
            outcome += ` and ${currencies[i].name}'s`;
        }
    }
    return outcome;
}

const getLanguages = (languages) => {
    let outcome = "";
    for (let i = 0; i < languages.length; i++) {
        if (i === 0) {
            outcome += `${languages[i].name}`;
        } else if (i < (languages.length -1)) {
            outcome += `, ${languages[i].name}`
        } else {
            outcome += ` and ${languages[i].name}`;
        }
    }
    return outcome;
}

getCountry();

// const searchBar = document.getElementById("search-bar")
// const searchBarInput = document.getElementById('search-value');
// searchBar.addEventListener("submit", () => {
//     getCountry(searchBarInput.value)
//     searchBarInput.value = "";
// })




