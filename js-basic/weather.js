const weather = document.querySelector(".js-weather");


const API_KEY = "a1b05bca30646771b6644a9845230ad0";
const COORDS = 'coords';

function getWeather(lat, lng){
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
      return response.json()
    }).then(function(json){
      const temp = json.main.temp;
      const place = json.name;
      weather.innerText = `${temp} @ ${place}`;
    });
}


function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError(){
  console.log("지역을 찾을 수 없습니다.")
}

function askforCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);

}


function loadCoords(){
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null){
    askforCoords();
  }else{
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init(){
  loadCoords();

}

init();