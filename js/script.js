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
    getCurrentLocation();
    // getCurrentWeather();
    initActions();
    // showWeather();
  }

  function getCurrentLocation() {
    if ('geolocation' in navigator) {
      // console.log('loc available');
      navigator.geolocation.getCurrentPosition(function(position) {
        // console.log('position', position);
        state.lat = position.coords.latitude;
        state.lon = position.coords.longitude;
        // console.log('lat', state.lat);
        // console.log('lon', state.lon);

        getCurrentWeather(state.lat, state.lon);
      });
    } else {
      console.log('loc unavailable');
    }
  }

  function getCurrentWeather(lat, lon) {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;
    // console.log('url', url);
    // console.log('weather lat', lat);
    // console.log('weather lon', lon);

    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log('data', data);

        state.location = data.name;
        state.temp = data.main.temp;
        state.description = data.weather[0].description;
        state.iconId = data.weather[0].icon;

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
      // console.log('tempDom', tempDom.innerHTML);
      const kTemp = state.temp;

      const cTemp = kelvinToCelsius(kTemp);
      // console.log('cTemp', cTemp);

      const fTemp = kelvinToFahrenheit(kTemp);
      // console.log('fTemp', fTemp);

      if (tempDom.innerHTML == cTemp) {
        tempDom.innerHTML = fTemp + '&degF';
      } else {
        tempDom.innerHTML = cTemp + '&degC';
      }
    });

    search.addEventListener('click', function() {
      const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + input.value + '&appid=' + apiKey;

      fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(newData) {
          console.log('data', newData);
          state.location = input.value;
          state.temp = newData.main.temp;
          state.description = newData.weather[0].description;
          state.iconId = newData.weather[0].icon;

          showWeather();
        })
        .catch(error => alert('No such city'));
    });

    input.addEventListener('keydown', function(e) {
      if (e.keyCode === 13) {
        e.preventDefault();

        const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + input.value + '&appid=' + apiKey;

        fetch(url)
          .then(function(response) {
            return response.json();
          })
          .then(function(newData) {
            console.log('data', newData);
            state.location = input.value;
            state.temp = newData.main.temp;
            state.description = newData.weather[0].description;
            state.iconId = newData.weather[0].icon;

            showWeather();
          });
      }
    });
  }

}
