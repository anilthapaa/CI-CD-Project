const apiKey = '8c8530f0f5f0040c40f60275a4355cd1'; // Will be replaced during CI

async function getWeather(cityName) {
  if (!cityName) throw new Error('City name required');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric`;
  const res = await fetch(url);

  if (!res.ok) throw new Error('City not found');

  const data = await res.json();

  return {
    city: data.name,
    temperature: data.main.temp,
    condition: data.weather[0].description,
  };
}

// For browser use (your existing HTML app)
if (typeof window !== 'undefined') {
  window.getWeather = async function () {
    const city = document.getElementById('city').value.trim();
    const result = document.getElementById('result');

    if (!city) {
      result.textContent = 'Please enter a city name.';
      return;
    }

    result.textContent = 'Loading...';

    try {
      const data = await getWeather(city);
      result.textContent = `Weather in ${data.city}: ${data.temperature}°C, ${data.condition}`;
    } catch (err) {
      result.textContent = err.message;
    }
  };
}

module.exports = { getWeather };
