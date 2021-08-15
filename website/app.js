//variables for fetch openweather
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=a30327fcd5c86dfbe2b13b8e5ba39c59&units=metric";

//button to get values
const bttnGenerate = document.getElementById("generate");

//value elements
const zipCode = document.getElementById("zip");
const feelingsMsg = document.getElementById("feeling");

//UI elements
const city = document.getElementById("city");
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const content = document.getElementById("content");
const holder = document.getElementById("entryHolder");

//Date data
let today = new Date();
let todayDate =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

//function to dataWeather event

const dataWeather = event => {
  event.preventDefault();

  const zip = zipCode.value;
  const feels = feelingsMsg.value;
  urlData = baseURL + zip + apiKey;

  if (zip && feels) {
    weatherZip(urlData)
      .then(zipData => {
        const temp = zipData.main.temp;
        const city = zipData.name;
        postData("/appAdd", {
          temp,
          city,
          feels
        });
      })
      .then(data => getData("/appSend"))
      .then(data => upUI(data))
      .catch(err => {
        cleaner();
        alert("ZIP Code invalid");
      });
  } else {
    alert("Fill all fields");
  }
};

//function asyncronius to URL + ZIP + apiKey
const weatherZip = async urlData => {
  const response = await fetch(urlData);
  try {
    const zipData = await response.json();
    // console.log(zipData);
    return zipData;
  } catch (err) {
    console.log("Error", err);
  }
};

//function de post data on server
const postData = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (err) {
    console.log("ERROR", err);
  }
};

//function to get data from server
const getData = async url => {
  const response = await fetch(url);
  try {
    const dataSend = await response.json();
    return dataSend;
  } catch (err) {
    console.log("ERROR", err);
  }
};

//update UI on Entry Holder
const upUI = async d => {
  const data = await d;

  holder.style.display = "block";
  city.innerHTML = `<h2>${data.city}</h2>`;
  date.innerHTML = `<p>Today: ${todayDate}</p>`;
  temp.innerHTML = `<p>Temperature: ${data.temp} °C</p>`;
  content.innerHTML = `<p>My feelings: ${data.feels}</p>`;
};

const cleaner = () => {
  zipCode.value = "";
  feelingsMsg.value = "";
  holder.style.display = "none";
};

bttnGenerate.addEventListener("click", dataWeather);
