
const nameOfC = new URLSearchParams(location.search).get('name')
const countryPageSection = document.querySelector('.country-page-section')
const themeChanger = document.querySelector('.header-content p')
const backButton = document.querySelector('.back-button')
const theme = localStorage.getItem('theme')
if (theme == 'dark') {
    themeChanger.innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode'
    document.body.classList.add('dark')
} else {
    themeChanger.innerHTML = '<i class="fa-regular fa-moon"></i> Dark Mode'
    document.body.classList.remove('dark')
}
fetch(`https://restcountries.com/v3.1/name/${nameOfC}?fullText=true`).then(res => res.json()).then(data => {
    const country = data[0]
    const countrySection = document.createElement('div')
    countrySection.classList.add('country-section')
    const countryData = `
            <img src="${country.flags.svg}" alt="${country.name.common}">
            <div class="country-details">
                <h2>${country.name.common}</h2>
                <div class="country-basic-detail">
                    <div class="left-sec">
                        <p><b>Native Name: </b>${country.name.nativeName ? Object.values(country.name.nativeName)[0].common : 'None'}</p>
                        <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
                        <p><b>Region: </b>${country.region ? country.region : 'None'}</p>
                        <p><b>Sub Region: </b>${country.subregion ? country.subregion : 'None'}</p>
                        <p><b>Capital: </b>${country.capital ? country.capital[0] : 'None'}</p>
                    </div>
                    <div class="right-sec">
                        <p><b>Top Level Domain: </b>${country.tld ? country.tld.join(', ') : 'None'}</p>
                        <p><b>Currencies: </b>${country.currencies ? getCurrencies(country.currencies) : 'None'}</p>
                        <p><b>Languages: </b>${country.languages ? getLanguages(country.languages) : 'None'}</p>
                    </div>
                </div>
                <p class='border-con'>
                    <b class="border-tag">Border Countries: </b>
                </p>
            </div>
    `
    countrySection.innerHTML = countryData
    countryPageSection.appendChild(countrySection)
    const borderCon = document.querySelector('.border-con')
    if (country.borders) {
        country.borders.forEach((border) => {
            fetch(`https://restcountries.com/v3.1/alpha/${border}`).then(res => res.json()).then(data => {
                const anchorr = document.createElement('a')
                anchorr.href = `/country.html?name=${data[0].name.common}`
                anchorr.classList.add('back-button')
                anchorr.innerHTML = `${data[0].name.common}`
                borderCon.append(anchorr)
            })
        })
    } else {
        const spAn = document.createElement('span')
        spAn.innerHTML = 'None'
        borderCon.append(spAn)
    }
})

function getCurrencies(curr) {
    const currKeys = Object.keys(curr)
    const arr = []
    currKeys.forEach(el => {
        arr.push(curr[el].name)
    })
    return arr.join(', ')
}

function getLanguages(lang) {
    const langValues = Object.values(lang)
    return langValues.join(', ')
}

themeChanger.addEventListener('click', () => {
    document.body.classList.toggle('dark')
    if ([...document.body.classList].includes('dark')) {
        themeChanger.innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode'
        localStorage.setItem('theme', 'dark')
    } else {
        themeChanger.innerHTML = '<i class="fa-regular fa-moon"></i> Dark Mode'
        localStorage.setItem('theme', 'light')
    }
})

backButton.addEventListener('click', () => {
    // sessionStorage.setItem('reloaded' , 'true')
    // history.back()
    location.href = '/index.html'
})
