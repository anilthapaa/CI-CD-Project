const { getWeather } = require('../src/weather');
global.fetch = require('jest-fetch-mock');

beforeEach(() => {
  fetch.resetMocks();
});

describe('Weather CLI', () => {
  test('fetches weather for a valid city', async () => {
    const mockApiResponse = {
      name: 'Kathmandu',
      main: { temp: 25 },
      weather: [{ description: 'clear sky' }],
    };

    fetch.mockResponseOnce(JSON.stringify(mockApiResponse));

    const data = await getWeather('Kathmandu');
    expect(data).toHaveProperty('temperature', 25);
    expect(data).toHaveProperty('city', 'Kathmandu');
    expect(data).toHaveProperty('condition', 'clear sky');
  });

  test('throws an error for invalid city', async () => {
    fetch.mockResponseOnce('', { status: 404 });
    await expect(getWeather('InvalidCityName12345')).rejects.toThrow('City not found');
  });
});
