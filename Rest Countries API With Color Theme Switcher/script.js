// While coming back from country details page in ph the main page is not updating the theme
// That's why hard reloading the page
// console.log(localStorage.getItem('fromBack'))
// if(localStorage.getItem('fromBack') == 'true'){
//     console.log('here')
//     localStorage.setItem('fromBack', '')
//     history.go(0)
//     window.location.href = window.location.href
// }
// import { fromBack } from "./country.js";
// if(fromBack){
//     fromBack = false  
//     location.reload()
// }
// clearTimeout(localStorage.getItem('date-Time'))
// if(localStorage.getItem('bby')){

// }else{
//     const dataTime = setTimeout(()=>{
//         location.reload()
//         localStorage.setItem('bby', 'bby')
        
//     },100)
// }
// window.onload = function() {
//     if(!window.location.hash) {
//         window.location = window.location + '#loaded';
//         window.location.reload();
//     }
// }
// if (sessionStorage.getItem('reloaded') === null) {
// } else {
//     sessionStorage.removeItem('reloaded');
//     console.log('here')
//     location.reload();
// }

const countriesContainer = document.querySelector('.countries-container')
const filterByRegion = document.querySelector('.filter-by-region')
const searchByInput = document.querySelector('.search-container input')
const themeChanger = document.querySelector('.header-content p')
const theme = localStorage.getItem('theme')

if(theme == 'dark'){
    themeChanger.innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode'
    document.body.classList.add('dark')
}else {
    themeChanger.innerHTML = '<i class="fa-regular fa-moon"></i> Dark Mode'
    document.body.classList.remove('dark')
}
let allCountriesData

fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital')
    .then((res) => res.json())
    .then((data) => {
        renderCountries(data)
        allCountriesData = data
    })

filterByRegion.addEventListener('change', (e) => {
    fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
        .then((res) => res.json())
        .then((data) => {
            renderCountries(data)
            allCountriesData = data
            searchByInput.value = ''
        })
})

// Here on the above renderCountries function call we can do it by two ways
// One way is passing the data while calling the function
// .then((data) => {
//     renderCountries(data)
// })
// Second way is Passing the function call to .then 
// .then((renderCountries))

function renderCountries(data){
    countriesContainer.innerHTML = ''
    data.forEach(country => {
        const countryCard = document.createElement('a')
        countryCard.setAttribute('title', 'Select to see the details')
        countryCard.classList.add('country-card')
        countryCard.href = `/country.html?name=${country.name.common}`
        const cardHTML = `
            <img src="${country.flags.svg}" alt="${country.name.common}">
            <div class="card-text">
                <h3 class="card-title">${country.name.common}</h3>
                <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
                <p><b>Region: </b>${country.region}</p>
                <p><b>Capital: </b>${country.capital ? country.capital[0] : 'None'}</p>
            </div>  
        `
        countryCard.innerHTML = cardHTML
        countriesContainer.append(countryCard)
    });
}

searchByInput.addEventListener('input' , (e)=>{
    const filteredCountries = allCountriesData.filter(res => res.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    renderCountries(filteredCountries)
})

themeChanger.addEventListener('click' , () => {
    document.body.classList.toggle('dark')
    if([...document.body.classList].includes('dark')){
        themeChanger.innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode'
        localStorage.setItem('theme', 'dark')
    }else{
        themeChanger.innerHTML = '<i class="fa-regular fa-moon"></i> Dark Mode'
        localStorage.setItem('theme', 'light')
    }
})

