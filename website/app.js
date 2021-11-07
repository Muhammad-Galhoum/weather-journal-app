/* Global Variables */
const BASE_URL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const API_KEY = ",&appid=945ae9228c6d6ce1ad889b131944a548&units=metric";
const server = "http://localhost:6600/";
const zipInput = document.getElementById("zip");
const feelingsInput = document.getElementById("feelings");
const generateBtn = document.getElementById("generate");
const clearBtn = document.getElementById("clear-btn");
const dateElement = document.getElementById("date");
const tepmElement = document.getElementById("temp");
const contentElement = document.getElementById("content");
const errorMessage = document.getElementById("error-message");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();

//Event-listener
generateBtn.addEventListener("click", gatheringData);
clearBtn.addEventListener('click' ,()=> location.reload());


function gatheringData() {
  let allData = {
    zipValue: zipInput.value,
    feelingsValue: feelingsInput.value,
    dateValu: newDate,
  };

  let weatherData = getWeatherData(allData.zipValue, API_KEY);
  weatherData
    .then((zipData) => {
      zipData.cod != 200
        ? handilingError(zipData.message)
        : ((allData.temp = zipData.main.temp),
          (allData.content = allData.feelingsValue),
          (allData.date = allData.dateValu));

      postDataToServer(allData);
    })
    .catch((error) => console.log(error));
}

async function getWeatherData(zipCode, apiKey) {
  let res = await fetch(`${BASE_URL}${zipCode}${apiKey}`);
  let zipData = await res.json();
  return zipData;
}


async function postDataToServer(data) {
  let res = await fetch(`${server}postData`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  try {
    res.json().then((data) => {
      res.ok ? updataUi() : "";
    });
  } catch (error) { console.log(error) }
 
};

async function updataUi() {
  let res = await fetch(`${server}all`);
  try {
    res
      .json()
      .then((data) => {
        dateElement.innerHTML += `<span class ='data-post'>${data.date}</span>`;
        tepmElement.innerHTML += `<span class ='data-post'>${data.temp}</span>`;
        contentElement.innerHTML += `<span class ='data-post'>${data.content}</span>`;
      })
      .catch((error) => console.log(error));
  } catch (error)  { console.log(error) }
};

// handling error  ZipCod
function handilingError(message) {
  errorMessage.innerHTML = message;
  errorMessage.classList.add("show");
  setTimeout(() => {
    errorMessage.classList.remove("show");
    errorMessage.innerHTML = "";
  }, 3000);
};



