{
  const apiKey = 'b97ff9652ee99d6757032c1c09248e16';
  const location = document.getElementById('location');
  const tempDom = document.getElementById('temp');
  const description = document.getElementById('description');
  const picture = document.getElementById('weather-pic');
  const search = document.querySelector('.newLocation .fa-search');
  const input = document.querySelector('.newLocation input');

  const state = {};

  init();

  function init() {
    getCurrentLocation().then(function() {
      getCurrentWeather();
      getAndShowWeather();
    });
    initActions();
    // showWeather();
  }

  function getCurrentLocation() {
    return new Promise(function(resolve, reject) {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {

          state.lat = position.coords.latitude;
          state.lon = position.coords.longitude;

          return resolve();
        });
      } else {
        return reject('loc unavailable');
      }
    });
  }

  function getCurrentWeather() {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + state.lat + '&lon=' + state.lon + '&appid=' + apiKey;

    return fetch(url).then(response => response.json());
  }

  function getAndShowWeather() {
    getCurrentWeather()
      .then(data => {
        setState(data);
        showWeather();
      });
  }

  function showWeather() {
    location.innerHTML = state.location;

    description.innerHTML = state.description;

    tempDom.innerHTML = kelvinToCelsius(state.temp) + '&degC';

    const iconId = state.iconId;
    picture.innerHTML = '<img src="http://openweathermap.org/img/wn/' + iconId + '@2x.png">';
  }

  function kelvinToCelsius(temp) {
    const celsiusTemp = temp - 273.15;
    const tempRounded = Math.round(celsiusTemp);

    return tempRounded;
  }

  function kelvinToFahrenheit(temp) {
    const fTemp = (temp - 273.15) * 9/5 + 32;
    const tempRounded = Math.round(fTemp);

    return tempRounded;
  }

  function initActions() {
    tempDom.addEventListener('click', function() {
      tempDom.innerHTML = tempDom.innerHTML.replace('\xB0C', '');
      const kTemp = state.temp;

      const cTemp = kelvinToCelsius(kTemp);

      const fTemp = kelvinToFahrenheit(kTemp);

      if (tempDom.innerHTML == cTemp) {
        tempDom.innerHTML = fTemp + '&degF';
      } else {
        tempDom.innerHTML = cTemp + '&degC';
      }
    });

    search.addEventListener('click', function() {
      const newUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + input.value + '&appid=' + apiKey;

      fetch(newUrl)
        .then(function(response) {
          return response.json();
        })
        .then(function(newData) {
          setState(newData);
          showWeather();
        })
        .catch(error => alert('No such city', error));
    });

    input.addEventListener('keydown', function(e) {
      const newUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + input.value + '&appid=' + apiKey;

      if (e.keyCode === 13) {
        e.preventDefault();

        fetch(newUrl)
          .then(function(response) {
            return response.json();
          })
          .then(function(newData) {
            setState(newData);
            showWeather();
          });
      }
    });
  }

  function setState(data) {
    console.log('data', data);
    state.location = data.name;
    state.temp = data.main.temp;
    state.description = data.weather[0].description;
    state.iconId = data.weather[0].icon;
  }

}
