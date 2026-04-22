// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

const input = document.getElementById("state-input");
const button = document.getElementById("get-weather");
const result = document.getElementById("result");
const error = document.getElementById("error");

async function fetchWeatherData(state) {
  try {
    const response = await fetch(
      `https://api.weather.gov/alerts?area=${state}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    return data;

  } catch (err) {
    throw err;
  }
}

function displayWeather(data, state) {
  const count = data.features.length;
  result.textContent = `Current watches, warnings, and advisories for ${state.toUpperCase()}: ${count}`;
}


function displayError(message) {
  error.textContent = message;
}


function clearUI() {
  result.textContent = "";
  error.textContent = "";
}

button.addEventListener("click", async () => {
  const state = input.value.trim();

  clearUI();

  if (!state) {
    displayError("Please enter a state abbreviation");
    return;
  }

  try {
    const data = await fetchWeatherData(state);

    displayWeather(data, state);

    input.value = "";

  } catch (err) {
    displayError("Unable to fetch weather alerts");
  }
});