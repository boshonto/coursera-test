//All API Call

var apiKey = 'JUQs1g3WgDSdiA2D1e59YOT22Jh7D6w8';

//starting API call
const getCityInfo = async (city) => {

    //getting city name and parsing data
    const response = await fetch(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`);
    const cityData = await response.json();
    
    return cityData[0];

};

const getWeatherInfo = async (cityKey) => {

    //getting data for city forecast
    const forecastDataRequest = await fetch(`https://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}`);
    const forecastData = await forecastDataRequest.json();

    return forecastData[0];

};