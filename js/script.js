{
  const select = {
    apiKey: 'b97ff9652ee99d6757032c1c09248e16',
  }

  const location = document.getElementById('location');
  const tempDom = document.getElementById('temp');
  const description = document.getElementById('description');
  const picture = document.getElementById('weather-pic');

  init();

  function init() {
    getCurrentLocation();
    findLocation();
  }

  function getCurrentLocation() {
    if ('geolocation' in navigator) {
      //console.log('loc available');
      navigator.geolocation.getCurrentPosition(function(position) {
        //console.log('position', position);
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        // console.log('lat', lat);
        // console.log('lon', lon);

        getCurrentWeather(lat, lon);
      });
    } else {
      console.log('loc unavailable');
    }
  }

  function getCurrentWeather(lat, lon) {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + select.apiKey;
    // console.log('url', url);
    // console.log('weather lat', lat);
    // console.log('weather lon', lon);

    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log('data', data);
        showWeatherData(data);
      })
  }

  function showWeatherData(data) {
    location.innerHTML = data.name;

    const kTemp = data.main.temp;

    const cTemp = kelvinToCelsius(kTemp);
    console.log('cTemp', cTemp);

    const fTemp = kelvinToFahrenheit(kTemp);
    console.log('fTemp', fTemp);

    tempDom.innerHTML = cTemp + '&degC';

    tempDom.addEventListener('click', function() {
      tempDom.innerHTML = tempDom.innerHTML.replace('\xB0C', '');
      console.log('tempDom', tempDom.innerHTML);

      if (tempDom.innerHTML == cTemp) {
        tempDom.innerHTML = fTemp + '&degF';
      } else {
        tempDom.innerHTML = cTemp + '&degC';
      }
    });

    description.innerHTML = data.weather[0].description;

    const iconId = data.weather[0].icon;
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

  function findLocation() {
    const input = document.querySelector('.newLocation input');
    const search = document.querySelector('.newLocation .fa-search');

    let newCity;

    search.addEventListener('click', function() {
      newCity = input.value;

      const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + newCity + '&appid=' + select.apiKey;

      fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(newData) {
          console.log('data', newData);
          showWeatherData(newData);
        })
    });
  }

}
