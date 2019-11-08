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
        console.log('lat', lat);
        console.log('lon', lon);

        getCurrentWeather(lat, lon);
      });
    } else {
      console.log('loc unavailable');
    }
  }

  function getCurrentWeather(lat, lon) {
    const key = 'b97ff9652ee99d6757032c1c09248e16';
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + key;
    console.log('url', url);
    console.log('weather lat', lat);
    console.log('weather lon', lon);

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

    const temp = document.getElementById('temp');
    temp.innerHTML = data.main.temp + '&deg;';

    const description = document.getElementById('description');
    description.innerHTML = data.weather[0].description;
    
  }

}
