{
  init();

  function init() {
    getCurrentLocation();
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
    const key = 'b97ff9652ee99d6757032c1c09248e16';
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + key;
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
    const location = document.getElementById('location');
    location.innerHTML = data.name;

    const kTemp = data.main.temp;

    const cTemp = kelvinToCelsius(kTemp);

    const fTemp = kelvinToFahrenheit(kTemp);

    const tempDom = document.getElementById('temp');
    tempDom.innerHTML = cTemp + '&degC';

    tempDom.addEventListener('click', function() {
      tempDom.innerHTML = tempDom.innerHTML.replace('\xB0C', '');
      if (tempDom.innerHTML == cTemp) {
        tempDom.innerHTML = fTemp + '&degF';
      } else {
        tempDom.innerHTML = cTemp + '&degC';
      }
    });

    const description = document.getElementById('description');
    description.innerHTML = data.weather[0].description;

    const picture = document.getElementById('weather-pic');
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

}
