const apiKey = '8c8530f0f5f0040c40f60275a4355cd1'; // Will be replaced during CI

async function getWeather() {
  const city = document.getElementById('city').value.trim();
  const result = document.getElementById('result');

  if (!city) {
    result.textContent = 'Please enter a city name.';
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  result.textContent = 'Loading...';

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('City not found');
    const data = await res.json();
    result.textContent = `Weather in ${data.name}: ${data.main.temp}°C, ${data.weather[0].description}`;
  } catch (err) {
    result.textContent = err.message;
  }
}
