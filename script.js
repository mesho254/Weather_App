"use strict"
let weather = {
    apiKey: '20f2cf8acbe5710f5a0f9a66a99c1ea2',
    fetchWeather: function (city) {
        fetch('https://api.openweathermap.org/data/2.5/weather?q='
            + city
            + '&units=metric&appid='
            + this.apiKey)
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        // console.log(name, icon, description, temp, humidity, speed);
        document.querySelector('.city').innerText = "Weather in" + ' ' + name;
        document.querySelector('.icon').src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector('.description').innerText = description;
        document.querySelector('.temp').innerText = temp + "°C";
        document.querySelector('.humidity').innerText = "Humidity:" + ' ' + humidity + "%";
        document.querySelector('.wind').innerText = "Wind speed:" + ' ' + speed + "Km/hr";
        document.querySelector('.weather').classList.remove('loading');
        document.querySelector('.search-bar').value = '';
        // document.body.style.backgroundImage = "url('https://images.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
        this.fetchWeather(document.querySelector('.search-bar').value);
    }
};
document.querySelector('.search button').addEventListener('click', function () {
    weather.search();
});
document.querySelector('.search-bar').addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
        weather.search();
    }
});
weather.fetchWeather();