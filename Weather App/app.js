//All variables
const searchForm = document.querySelector('.search');
const weatherClass = document.querySelector('.weather');
const weatherIcon = document.querySelector('.icon img');
const bgImage = document.querySelector('.bg-image');
const cityName = document.querySelector('.cityName');
const countryName = document.querySelector('.country');
const forecastText = document.querySelector('.forecastText');
const temperature = document.querySelector('.temp-num');

//Updating City Details
const updateCity = async (cityname) => {

    const cityDetails = await getCityInfo(cityname);
    const weatherDetails = await getWeatherInfo(cityDetails.Key);

    return { cityDetails, weatherDetails };

};

//updating UI
const updateUI = (cityDet, weatherDet) => {

    //replacing city name, country name
    cityName.textContent = cityDet.EnglishName;
    countryName.textContent = cityDet.Country.EnglishName;

    //replacing temperature values and forecast text
    temperature.textContent = weatherDet.Temperature.Metric.Value;
    forecastText.textContent = weatherDet.WeatherText;
    
    //changing weather icon
    let forecastIcon = weatherDet.WeatherIcon;
    weatherIcon.setAttribute('src', `icons/${forecastIcon}.svg`);
    
    //getting daytime data
    const isDayTime = weatherDet.IsDayTime;

    if(isDayTime){
        bgImage.style.background = `url('day.svg')`;
        cityName.style.color = `#005580`;
        countryName.style.color = `#008055`;
    }
    else{
        bgImage.style.background = `url('night.svg')`;
        cityName.style.color = `white`;
        countryName.style.color = `#aaa`;
    }

}

//Getting Local Storage Item
let city = localStorage.getItem('cityName');

// Adding Local Storage city name
if (city != null) {

    updateCity(city)
        .then(data => updateUI(data.cityDetails , data.weatherDetails) )
        .catch(err => console.log(err));

}

//getting data from search
searchForm.addEventListener('submit', e => {
            
    //Preventing Default
    e.preventDefault();

    const city = document.querySelector('.search input').value.trim();

    //Resetting Form
    searchForm.reset();

    updateCity(city)
        .then(data => updateUI(data.cityDetails , data.weatherDetails))
        .catch(err => console.log(err));

    //Getting City Name and Storting in Local Storage
    localStorage.setItem('cityName', city);    

});

