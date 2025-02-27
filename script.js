const getData = async (location) => {
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=7dd4915119be40c780a50336252702&q=${location}&days=8&aqi=no&alerts=no`
  );

  if (!response.ok) {
    alert("invalid location");
    return;
  }

  const data = await response.json();
  console.log(data)

  if (!document.querySelector(".forecast-con")) {
    const foreCastCon = document.createElement("div");
    foreCastCon.className = "forecast-con";
    document.body.append(foreCastCon);
  }
  

  todayWeather(data);
  Forecast(data)

};

const todayWeather = async (data) => {
  document.querySelector(".con").innerHTML = "";

  document.querySelector(".con").innerHTML = `
  <div class="continer">
    <h1 class="place"></h1>
    <div class="tdy-weather">
      <img class="tdy-icon">
      <h2 class="temp">F</h2>
      <h2 class="status"></h2>
      <h4 class="updated"></h4>
    </div>
  </div>`;

  const place = document.querySelector(".place");
  place.innerHTML = `${data.location.name}, ${data.location.region}, ${data.location.country}`;

  const img = document.querySelector(".tdy-icon");
  const status = document.querySelector(".status");
  const updated = document.querySelector(".updated");
  const temp = document.querySelector(".temp");

  img.src = data.current.condition.icon;
  temp.innerHTML = `${data.current.temp_c}°C / ${data.current.temp_f}°F`;
  status.innerHTML = data.current.condition.text;
  updated.innerHTML = "Updated: " + data.current.last_updated;
};

const oneForecast = (data) => {
  const div = document.createElement("div")
  div.className = "fore-con"
  div.innerHTML = `<p class="for-date">${data.date}</p>
      <img src="${data.day.condition.icon}">
      <p class="for-status">${data.day.condition.text}</p>
      <p class="for-temp">${data.day.avgtemp_c}°C / ${data.day.avgtemp_f}°F</p>`
  document.querySelector(".forecast-con").append(div)
}

const Forecast = (data) => {
  document.querySelector(".forecast-con").innerHTML = ""
const forecastData = data.forecast.forecastday
for (let i = 1; i < 8; i++){
  oneForecast(forecastData[i])
}
}

const display = () => {
  const search = document.querySelector("#search");
  const location = document.querySelector("#location");
  
  search.addEventListener("click", () => {
    getData(location.value);
  });

  search.addEventListener("keydown", (event) => {
    if (event.key === "Enter"){
      getData(location.value);
    }
  })
};

display();
