const apiKey = 'd2178cb26ee35d0d1f63d74501ee52a8';

const map = L.map('map').setView([40.4093, 49.8671], 7);

const baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);

const clouds = L.tileLayer(`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${apiKey}`, { maxZoom: 19, attribution: '© OpenWeather' });
const precipitation = L.tileLayer(`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`, { maxZoom: 19, attribution: '© OpenWeather' });
const temperature = L.tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`, { maxZoom: 19, attribution: '© OpenWeather' });
const wind = L.tileLayer(`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${apiKey}`, { maxZoom: 19, attribution: '© OpenWeather' });

const overlays = {
  "Clouds": clouds,
  "Precipitation": precipitation,
  "Temperature": temperature,
  "Wind": wind
};

L.control.layers(null, overlays).addTo(map);

clouds.addTo(map);

window.addEventListener('resize', () => {
  map.invalidateSize();
});