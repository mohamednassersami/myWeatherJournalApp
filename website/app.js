/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=23fd332b53dffb4443b52ef312db48c0&units=imperial";

const tempElement = document.getElementById("temp");
const contentElement = document.getElementById("content");
const dateElement = document.getElementById("date");
const zipErrorElement = document.getElementById("zipError");
const feelingErrorElement = document.getElementById("feelingError");
const generateBtn = document.getElementById("generate");

// add event listener to generate button
generateBtn.addEventListener("click", generateData);

function generateData(event) {
  event.preventDefault();

  const zip = document.getElementById("zip").value;
  const feeling = document.getElementById("feelings").value;

  // generate currently date instance dynamically with JS
  let date = new Date();
  let dateFormat = date.toDateString();
  if (feeling.trim() !== "") {
    getTemperature(zip)
      .then((data) => {
        postData("/weatherData", {
          date: dateFormat,
          temp: Math.round(data.main.temp),
          feeling,
        });
      })
      .then(() => {
        updateUI();
        document.getElementById("entry").style.opacity = 1;
      });
  } else {
    document.getElementById("entry").style.opacity = 0;
    feelingErrorElement.innerHTML = "please entry your feeling";
    setTimeout(() => (feelingErrorElement.innerHTML = ""), 2000);
  }
}

// get temperature from API
const getTemperature = async (zip) => {
  try {
    const response = await fetch(baseURL + zip + apiKey);
    const data = await response.json();
    if (data.cod != 200) {
      document.getElementById("entry").style.opacity = 0;
      zipErrorElement.innerHTML = data.message;
      setTimeout(() => (zipErrorElement.innerHTML = ""), 2000);
    }
    return data;
  } catch (zipErrorElement) {
    console.log(zipErrorElement);
  }
};

// post data in server
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

// update UI
const updateUI = async () => {
  const response = await fetch("/all");
  try {
    const allData = await response.json();
    dateElement.innerHTML = `<span style="color: blue;">Date today:</span> ${allData.date}`;
    tempElement.innerHTML = `<span style="color: blue;">Temperature in Fahrenheit:</span> ${allData.temp} &degF`;
    contentElement.innerHTML = `<span style="color: blue;">your feeling: </span>${allData.feeling}`;
  } catch (error) {
    console.log("error", error);
  }
};
