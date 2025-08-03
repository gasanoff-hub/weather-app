const searchForm = document.querySelector(".header__form");
const searchInput = searchForm.querySelector(".header__input");
const submitBtn = searchForm.querySelector(".header__icon");
const cityEl = document.querySelector(".main__top-city");
const popEl = document.querySelector(".pop-value");
const tempEl = document.querySelector(".main__top-temperature");
const topIcon = document.querySelector(".main__top-img");
const todayWeatherHours = document.querySelectorAll(".main__content-item");
const btmTemp = document.querySelectorAll(".main__bottom-temperature");
const forecast = document.querySelector(".forecast__list");
const hiddenItems = document.querySelectorAll(".hidden");
const container = document.querySelector(".home-grid");
const showMoreMobile = document.querySelector(".btn--mobile");

document.addEventListener('DOMContentLoaded', () => {
  fetchWeatherData('New York');
})

searchInput.addEventListener("input", () => {
  let value = searchInput.value;
  if (value.length > 0)
    searchInput.value = value.charAt(0).toUpperCase() + value.slice(1);
});

searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const city = searchInput.value.trim();
    if (city) fetchWeatherData(city);
  }
});

// API
const fetchWeatherData = async (city) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=d2178cb26ee35d0d1f63d74501ee52a8&units=metric`
  );
  const data = await res.json();

  console.log(data);

  cityEl.textContent = data.city.name;
  popEl.textContent = Math.round(data.list[0].pop * 100) + "%";
  tempEl.textContent = Math.round(data.list[0].main.temp) + "°";

  const weatherIcon = {
    Clear: "/img/sunny.webp",
    Clouds: "/img/sun_cloud.webp",
    Rain: "/img/sun_rain.webp",
    Thunderstorm: "/img/rain_thunder.webp",
    Snow: "/img/snow.webp",
  };

  const weatherMain = data.list[0].weather[0].main;
  topIcon.src = weatherIcon[weatherMain];

  const forecastList = data.list.slice(0, 8);

  todayWeatherHours.forEach((item, index) => {
    const todayHour = item.querySelector(".main__content-hour");
    const todayIcon = item.querySelector(".main__content-img");
    const TodayTemp = item.querySelector(".main__content-temperature");

    const forecast = forecastList[index];

    const date = new Date(forecast.dt * 1000);
    const hours = date.getHours().toString().padStart(2, "0");
    const hourNum = parseInt(hours);
    const hour12 = hourNum % 12 || 12;
    const ampm = hourNum >= 12 ? "PM" : "AM";

    todayHour.textContent = `${hour12}:00 ${ampm}`;
    todayIcon.src = weatherIcon[forecast.weather[0].main];
    TodayTemp.textContent = Math.round(forecast.main.temp) + "°";
  });

  const weatherData = {
    "real-feel": Math.round(data.list[0].main.feels_like) + "°",
    wind: Math.round(data.list[0].wind.speed) + " km/h",
    rain: Math.round(data.list[0].pop * 100) + "%",
    humidity: data.list[0].main.humidity + "%",
    visibility: Math.round(data.list[0].visibility / 1000) + " km",
    pressure: data.list[0].main.pressure + " hPa",
    sunset: (() => {
      const sunsetUtc = data.city.sunset;
      const timezoneOffset = data.city.timezone;
      const sunsetLocal = new Date((sunsetUtc + timezoneOffset) * 1000);

      const h = sunsetLocal.getUTCHours().toString().padStart(2, "0");
      const m = sunsetLocal.getUTCMinutes().toString().padStart(2, "0");

      return `${h}:${m}`;
    })(),
  };

  btmTemp.forEach((el) => {
    const type = el.dataset.type;
    if (weatherData[type]) el.textContent = weatherData[type];
  });

  const dailyForecasts = data.list
    .filter((item) => item.dt_txt.includes("12:00:00"))
    .slice(0, 5);

  forecast.innerHTML = "";

  dailyForecasts.forEach((forecastData, index) => {
    const dayName =
      index === 0
        ? "Today"
        : new Date(forecastData.dt_txt).toLocaleDateString("en-US", {
            weekday: "short",
          });

    const weather = forecastData.weather[0].main;
    const iconSrc = weatherIcon[weather];

    const tempMax = Math.round(forecastData.main.temp_max);
    const tempMin = Math.round(forecastData.main.temp_min);

    const listItem = document.createElement("li");
    listItem.className = "forecast__item";
    listItem.innerHTML = `
            <h4 class="forecast__day">${dayName}</h4>
            <div class="forecast__weather">
                <img src="${iconSrc}" class="forecast__icon"> ${weather}
            </div>
            <h4 class="forecast__range">${tempMax}/${tempMin}</h4>
        `;

    forecast.appendChild(listItem);
  });
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const city = searchInput.value.trim();
  if (city) fetchWeatherData(city);
});

showMoreMobile.addEventListener("click", (e) => {
  e.preventDefault();
  hiddenItems.forEach((item) => {
    item.classList.toggle("hidden");
  });

  showMoreMobile.textContent =
    showMoreMobile.textContent === "SEE MORE" ? "LESS MORE" : "SEE MORE";
});