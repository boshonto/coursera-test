//All variables
var apiKey = '6E4IqUsISSCtSpRe8eSzR9GRLN6VfEtS';
const searchForm = document.querySelector('.search');
const searchFormInput = document.querySelector('.search input');
const weatherClass = document.querySelector('.weather');
const cityName = document.querySelector('.cityName');
const temperature = document.querySelector('.temp-num');
const forecastText = document.querySelector('.forecastText');
const countryName = document.querySelector('.country');
const weatherIcon = document.querySelector('.icon img');
const bgImage = document.querySelector('.bg-image');

searchForm.addEventListener('submit', e => {
    
    //Preventing Default
    e.preventDefault();
    weatherClass.classList.remove('hidden');
    
    //getting city name
    let city = searchFormInput.value;
    
    //starting API call
    const getCityInfo = async () => {

        try 
        {
            //getting city name and parsing data
            const response = await fetch(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`);
            const data = await response.json();

            //replacing city name, country name
            cityName.textContent = data[0].EnglishName;
            countryName.textContent = data[0].Country.EnglishName;

            //getting city key
            var cityKey = data[0].Key;

            //creating API call for forecast
            const forecastDataRequest = await fetch(`https://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}`);
            
            //getting data for city forecast
            const forecastData = await forecastDataRequest.json();

            //replacing temperature values and forecast text
            temperature.textContent = forecastData[0].Temperature.Metric.Value;
            forecastText.textContent = forecastData[0].WeatherText;
            
            //changing weather icon
            let forecastIcon = forecastData[0].WeatherIcon;
            weatherIcon.setAttribute('src', `icons/${forecastIcon}.svg`);

            //getting daytime data
            let isDayTime = forecastData[0].IsDayTime;

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

        catch(err) {
            console.log(err.message);
        }
    };

    getCityInfo();
    searchForm.reset();

});

