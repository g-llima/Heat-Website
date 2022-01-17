let cityName = document.getElementById("city-name");
let cityTemp = document.getElementById("city-temp");
let cityDesc = document.getElementById("city-desc");
let cityDescContainer = document.getElementById("cityDescContainer");
let cityTimeHour = document.getElementById("city-time-hour");
let cityTimeMinutes = document.getElementById("city-time-minutes");
let weekDay = document.getElementById("week-day");
let monthDay = document.getElementById("month-day");
let month = document.getElementById("month");
let ano = document.getElementById("ano");
let cityIcon = document.getElementById("city-weather-icon");
let input = document.getElementById("search-input");
let btn = document.getElementById("search-button");
let form = document.getElementById("form");
let exampleCities = document.getElementsByClassName("example-city");
let nextDayContainers = document.getElementsByClassName("next-day");
let tempMin = document.getElementsByClassName("temp-nd-min");
let city = document.getElementsByClassName("weather-detail");
let nuvens = document.getElementById("cloudly");
let umidade = document.getElementById("humidity");
let press = document.getElementById("pressure");
let vento = document.getElementById("wind");
let ventoSeta = document.getElementById("wind-arrow");
let weatherInfo = document.getElementById("weather-info-container");
let weatherBackground = document.getElementById("weatherBackground");
let weatherDetailsTitle = document.getElementById("weatherDetailsTitle");
let errorMsg = document.getElementById("errorMsg");
let errorTriangle = document.getElementById("errorTriangle");

let tempXDI1 = document.getElementById("nd1");
let tempXDI2 = document.getElementById("nd2");
let tempXDI3 = document.getElementById("nd3");
let tempXDI4 = document.getElementById("nd4");
let tempXDI5 = document.getElementById("nd5");
let tempXDI6 = document.getElementById("nd6");
let tempXDI7 = document.getElementById("nd7");

let tempXDTMax1 = document.getElementById("ndt1");
let tempXDTMax2 = document.getElementById("ndt2");
let tempXDTMax3 = document.getElementById("ndt3");
let tempXDTMax4 = document.getElementById("ndt4");
let tempXDTMax5 = document.getElementById("ndt5");
let tempXDTMax6 = document.getElementById("ndt6");
let tempXDTMax7 = document.getElementById("ndt7");

let tempXDTMin1 = document.getElementById("ndtMin1");
let tempXDTMin2 = document.getElementById("ndtMin2");
let tempXDTMin3 = document.getElementById("ndtMin3");
let tempXDTMin4 = document.getElementById("ndtMin4");
let tempXDTMin5 = document.getElementById("ndtMin5");
let tempXDTMin6 = document.getElementById("ndtMin6");
let tempXDTMin7 = document.getElementById("ndtMin7");

let weekDayText1 = document.getElementById("weekDayText1");
let weekDayText3 = document.getElementById("weekDayText3");
let weekDayText4 = document.getElementById("weekDayText4");
let weekDayText2 = document.getElementById("weekDayText2");
let weekDayText5 = document.getElementById("weekDayText5");
let weekDayText6 = document.getElementById("weekDayText6");
let weekDayText7 = document.getElementById("weekDayText7");

let weekDayPre1 = document.getElementById("ndtPre1");
let weekDayPre2 = document.getElementById("ndtPre2");
let weekDayPre3 = document.getElementById("ndtPre3");
let weekDayPre4 = document.getElementById("ndtPre4");
let weekDayPre5 = document.getElementById("ndtPre5");
let weekDayPre6 = document.getElementById("ndtPre6");
let weekDayPre7 = document.getElementById("ndtPre7");

const setVisible = (elementOrSelector, visible) =>
  ((typeof elementOrSelector === "string"
    ? document.querySelector(elementOrSelector)
    : elementOrSelector
  ).style.display = visible ? "block" : "none");

setVisible(".weather-container", false);
setVisible("#loading", true);

document.addEventListener("DOMContentLoaded", () =>
  setTimeout(() => {
    setVisible(".weather-container", true);
    setVisible("#loading", false);
  }, 1000)
);

function handleForm(event) {
  event.preventDefault();
}
form.addEventListener("submit", handleForm);

let value = "";

const controller = new AbortController();
const signal = controller.signal;

input.addEventListener("change", (e) => {
  value = e.target.value;
});

exampleCities[0].addEventListener("click", () => {
  exampleCitiesClick(exampleCities[0].innerText);
});
exampleCities[1].addEventListener("click", () => {
  exampleCitiesClick(exampleCities[1].innerText);
});
exampleCities[2].addEventListener("click", () => {
  exampleCitiesClick(exampleCities[2].innerText);
});
exampleCities[3].addEventListener("click", () => {
  exampleCitiesClick(exampleCities[3].innerText);
});

function delay() {
  setVisible(".weather-container", false);
  setVisible("#loading", true);
  setTimeout(() => {
    setVisible(".weather-container", true);
    setVisible("#loading", false);
  }, 1000);
}

function exampleCitiesClick(city) {
  delay();
  stopFetch();
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=pt_br&appid=de23d3aa3b006a5eca0191ea954a2809`
  )
    .then((res) => res.json())
    .then((dataCidade) => {
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${dataCidade["coord"]["lat"]}&lon=${dataCidade["coord"]["lon"]}&exclude=hourly,minutely&appid=824ef661a0e728e92cfdfc9635b8e8ac&lang=pt_br`
      )
        .then((res2) => res2.json())
        .then((dataLocal) => {
          setDate(dataCidade);
          setNextDays(dataLocal);
          errorTriangle.style.display = "none";
        });
    });
}
function inputSend() {
  delay();
  stopFetch();
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${value}&lang=pt_br&appid=824ef661a0e728e92cfdfc9635b8e8ac`
  )
    .then((res) => res.json())
    .then((dataCidade) => {
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${dataCidade["coord"]["lat"]}&lon=${dataCidade["coord"]["lon"]}&exclude=hourly,minutely&appid=824ef661a0e728e92cfdfc9635b8e8ac&lang=pt_br`
      )
        .then((res2) => res2.json())
        .then((datalocal) => {
          setDate(dataCidade);
          setNextDays(datalocal);
          errorTriangle.style.display = "none";
        });
    })
    .catch(() => {
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=London,UK&lang=pt_br&appid=824ef661a0e728e92cfdfc9635b8e8ac`
      )
        .then((res) => res.json())
        .then((dataCidade) => {
          fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${dataCidade["coord"]["lat"]}&lon=${dataCidade["coord"]["lon"]}&exclude=hourly,minutely&appid=824ef661a0e728e92cfdfc9635b8e8ac&lang=pt_br`
          )
            .then((res2) => res2.json())
            .then((dataLocal) => {
              setDate(dataCidade);
              setNextDays(dataLocal);
              errorTriangle.style.display = "block";
            });
        });
    });
}

const diasSemana = [
  "Domingo",
  "Segunda-Feira",
  "Terça-Feira",
  "Quarta-Feira",
  "Quinta-Feira",
  "Sexta-Feira",
  "Sábado",
];

const diasSemanaAbr = [
  "Dom",
  "Seg",
  "Ter",
  "Qua",
  "Qui",
  "Sex",
  "Sab",
  "Dom",
  "Seg",
  "Ter",
  "Qua",
  "Qui",
  "Sex",
  "Sab",
];
const meses = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

$.getJSON("http://ip-api.com/json/")
  .done((location) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${location["city"]}&appid=824ef661a0e728e92cfdfc9635b8e8ac&lang=pt_br`,
      { method: "get", signal: signal }
    )
      .then((res) => res.json())
      .then((dataCidade) => {
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${dataCidade["coord"]["lat"]}&lon=${dataCidade["coord"]["lon"]}&exclude=hourly,minutely&appid=824ef661a0e728e92cfdfc9635b8e8ac&lang=pt_br`
        )
          .then((res2) => res2.json())
          .then((dataLocal) => {
            delay();
            setDate(dataCidade);
            setNextDays(dataLocal);
            errorTriangle.style.display = "none";
          });
      });
  })

  .fail(() => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=London,UK&lang=pt_br&appid=824ef661a0e728e92cfdfc9635b8e8ac`,
      { method: "get", signal: signal }
    )
      .then((res) => res.json())
      .then((dataCidade) => {
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${dataCidade["coord"]["lat"]}&lon=${dataCidade["coord"]["lon"]}&exclude=hourly,minutely&appid=824ef661a0e728e92cfdfc9635b8e8ac&lang=pt_br`
        )
          .then((res2) => res2.json())
          .then((dataLocal) => {
            delay();
            setDate(dataCidade);
            setNextDays(dataLocal);
            errorTriangle.style.display = "none";
          });
      });
  });

function stopFetch() {
  controller.abort();
}

function setDate(dataCidade) {
  let date = new Date();
  const userUtc = date.getTimezoneOffset() / 60;
  const utc = dataCidade["timezone"] / 3600;
  let windSpeed = dataCidade.wind.speed * 3.6;

  date.setHours(date.getHours() + userUtc);
  date.setHours(date.getHours() + utc);

  weekDay.innerHTML = diasSemana[date.getDay()];
  monthDay.innerHTML = date.getDate();
  month.innerHTML = meses[date.getMonth()];
  cityTimeHour.innerHTML = date.getHours();
  ano.innerHTML = date.getFullYear().toString().substring(2);
  cloudly.innerHTML = dataCidade["clouds"]["all"] + "%";
  umidade.innerHTML = dataCidade["main"]["humidity"] + "%";
  press.innerHTML = dataCidade["main"]["pressure"] + " hPa";
  vento.innerHTML = Math.round(windSpeed) + " km/h";
  getWindDegree(dataCidade["wind"]["deg"]);
  backgroundImageChanger(dataCidade);

  cityIcon.src =
    "http://openweathermap.org/img/wn/" +
    dataCidade["weather"][0]["icon"] +
    "@2x.png";

  if (date.getMinutes() < 10) {
    cityTimeMinutes.innerHTML = 0 + String(date.getMinutes());
  } else {
    cityTimeMinutes.innerHTML = date.getMinutes();
  }

  if (date.getHours() < 10) {
    cityTimeHour.innerHTML = 0 + String(date.getHours());
  } else {
    cityTimeHour.innerHTML = date.getHours();
  }

  let city = dataCidade["name"];
  let country = dataCidade["sys"]["country"];
  let desc = dataCidade["weather"][0]["description"];
  let temp = Math.round(dataCidade["main"]["temp"] - 273.15);

  cityName.innerHTML =
    city + ", <span class='region-info'>" + country + "</span>";

  cityTemp.innerHTML = temp + "°";
  cityDesc.innerHTML = desc;

  function getTime() {
    btn.addEventListener("click", () => {
      clearTimeout(timeID);
    });
    exampleCities[0].addEventListener("click", () => {
      clearTimeout(timeID);
    });
    exampleCities[1].addEventListener("click", () => {
      clearTimeout(timeID);
    });
    exampleCities[2].addEventListener("click", () => {
      clearTimeout(timeID);
    });
    exampleCities[3].addEventListener("click", () => {
      clearTimeout(timeID);
    });
    var timeID = setTimeout(() => {
      let date = new Date();
      let temp = Math.round(dataCidade["main"]["temp"] - 273.15);
      let desc = dataCidade["weather"][0]["description"];
      const userUtc = date.getTimezoneOffset() / 60;
      const utc = dataCidade["timezone"] / 3600;
      let windSpeed = dataCidade["wind"]["speed"] * 3.6;

      date.setHours(date.getHours() + userUtc);
      date.setHours(date.getHours() + utc);

      cityTimeHour.innerHTML = date.getHours();
      ano.innerHTML = date.getFullYear().toString().substring(2);
      cityTemp.innerHTML = temp + "°";
      cityDesc.innerHTML = desc;
      cloudly.innerHTML = dataCidade["clouds"]["all"] + "%";
      umidade.innerHTML = dataCidade["main"]["humidity"] + "%";
      press.innerHTML = dataCidade["main"]["pressure"] + " hPa";
      vento.innerHTML = Math.round(windSpeed) + " km/h";
      getWindDegree(dataCidade["wind"]["deg"]);

      if (date.getMinutes() < 10) {
        cityTimeMinutes.innerHTML = 0 + String(date.getMinutes());
      } else {
        cityTimeMinutes.innerHTML = date.getMinutes();
      }
      if (date.getHours() < 10) {
        cityTimeHour.innerHTML = 0 + String(date.getHours());
      } else {
        cityTimeHour.innerHTML = date.getHours();
      }

      weekDay.innerHTML = diasSemana[date.getDay()];
      monthDay.innerHTML = date.getDate();
      month.innerHTML = meses[date.getMonth()];

      cityIcon.src =
        "http://openweathermap.org/img/wn/" +
        dataCidade["weather"][0]["icon"] +
        "@2x.png";

      getTime();
    }, 1000);
  }

  getTime();
}
function getWindDegree(degree) {
  degree += 22.5;

  if (degree < 0) {
    degree = 360 - (Math.abs(degree) % 360);
  } else {
    degree = degree % 360;
  }
  ventoSeta.style.transform = `rotate(${degree}deg)`;
}
function backgroundImageChanger(dataCidade) {
  resetColors();
  // TEMPESTADE
  if (
    dataCidade["weather"][0]["icon"] == "11d" ||
    dataCidade["weather"][0]["icon"] == "11n"
  ) {
    if (
      dataCidade["weather"][0]["id"] == 202 ||
      dataCidade["weather"][0]["id"] == 212
    ) {
      weatherBackground.style.background =
        "url('https://i.ibb.co/F8RNgYF/heavy-Thunderstorm.jpg')";
      weatherBackground.style.backgroundPosition = "right";
      weatherBackground.style.backgroundSize = "cover";
    } else {
      weatherBackground.style.background =
        "url('https://i.ibb.co/dDLYfrh/thunderstorm.jpg')";
      weatherBackground.style.backgroundPosition = "right";
      weatherBackground.style.backgroundSize = "cover";
    }
  }
  // NUVENS DIA
  if (
    dataCidade["weather"][0]["icon"] == "02d" ||
    dataCidade["weather"][0]["icon"] == "03d" ||
    dataCidade["weather"][0]["icon"] == "04d"
  ) {
    if (
      dataCidade["weather"][0]["id"] == 801 ||
      dataCidade["weather"][0]["id"] == 802
    ) {
      weatherBackground.style.background =
        "url('https://i.ibb.co/8MrG8JC/few-Clouds.jpg')";
      weatherBackground.style.backgroundPosition = "left";
      input.style.backgroundColor = "gray";

      for (let i = 0; i < exampleCities.length; i++) {
        exampleCities[i].style.color = "white";
      }
      for (let i = 0; i < nextDayContainers.length; i++) {
        nextDayContainers[i].style.border = "1px solid black";
      }
      for (let i = 0; i < city.length; i++) {
        city[i].style.color = "white";
      }
    } else {
      weatherBackground.style.background =
        "url('https://i.ibb.co/7jQ0dct/multiple-Clouds.jpg')";
      input.style.backgroundColor = "gray";
      for (let i = 0; i < exampleCities.length; i++) {
        exampleCities[i].style.color = "white";
      }
      for (let i = 0; i < nextDayContainers.length; i++) {
        nextDayContainers[i].style.border = "1px solid black";
      }
      for (let i = 0; i < city.length; i++) {
        city[i].style.color = "white";
      }
    }
    // NUVENS NOITE
  } else if (
    dataCidade["weather"][0]["icon"] == "02n" ||
    dataCidade["weather"][0]["icon"] == "03n" ||
    dataCidade["weather"][0]["icon"] == "04n"
  ) {
    if (
      dataCidade["weather"][0]["id"] == 801 ||
      dataCidade["weather"][0]["id"] == 802
    ) {
      weatherBackground.style.background =
        "url('https://i.ibb.co/jkHw8q0/few-Clouds-N.jpg')";
      weatherBackground.style.backgroundPosition = "left";
    } else {
      weatherBackground.style.background =
        "url('https://i.ibb.co/6Zn4rfW/multiple-Clouds-N.jpg')";
      weatherBackground.style.backgroundPosition = "center";
    }
  }
  // DIA LIMPO
  if (dataCidade["weather"][0]["icon"] == "01d") {
    weatherBackground.style.background =
      "url('https://i.ibb.co/7NLhQvY/Sunshine-clouds-sky-during-morning-background-Blue-white-pastel-heaven-soft-focus-lens-flare-sunligh.jpg')";
    weatherInfo.style.background = "rgba(78, 78, 78, 0.5)";
  }
  // NOITE LIMPA
  if (dataCidade["weather"][0]["icon"] == "01n") {
    weatherBackground.style.background =
      "url('https://i.ibb.co/QD86mPh/clean-Sky-N.jpg')";
    weatherBackground.style.backgroundPosition = "right";
  }
  // NÉVOA, FUMAÇA...
  if (
    dataCidade["weather"][0]["id"] == 701 ||
    dataCidade["weather"][0]["id"] == 711 ||
    dataCidade["weather"][0]["id"] == 721 ||
    dataCidade["weather"][0]["id"] == 741
  ) {
    weatherBackground.style.background =
      "url('https://i.ibb.co/DwKGv1N/mist.jpg')";
    input.style.backgroundColor = "gray";
    for (let i = 0; i < exampleCities.length; i++) {
      exampleCities[i].style.color = "white";
    }
    for (let i = 0; i < city.length; i++) {
      city[i].style.color = "white";
    }
    for (let i = 0; i < nextDayContainers.length; i++) {
      nextDayContainers[i].style.border = "1px solid black";
    }
    weatherInfo.style.background = "rgba(78, 78, 78, 0.5)";
  }
  //  POEIRA
  if (
    dataCidade["weather"][0]["id"] == 731 ||
    dataCidade["weather"][0]["id"] == 751 ||
    dataCidade["weather"][0]["id"] == 761
  ) {
    weatherBackground.style.background =
      "url('https://i.ibb.co/wKkqrQR/dust.jpg')";
    input.style.backgroundColor = "gray";
    for (let i = 0; i < exampleCities.length; i++) {
      exampleCities[i].style.color = "white";
    }
    for (let i = 0; i < city.length; i++) {
      city[i].style.color = "white";
    }
    for (let i = 0; i < nextDayContainers.length; i++) {
      nextDayContainers[i].style.border = "1px solid black";
    }
    weatherInfo.style.background = "rgba(78, 78, 78, 0.5)";
  }
  //  TORNADO
  if (dataCidade["weather"][0]["id"] == 781) {
    weatherBackground.style.background =
      "url('https://i.ibb.co/hygHLKX/tornado.jpg')";
    weatherBackground.style.backgroundPositionY = "-250px";
  }
  // NEVE
  if (dataCidade["weather"][0]["icon"] == "13d") {
    weatherBackground.style.background =
      "url('https://i.ibb.co/M5m82KZ/snow.jpg')";
    for (let i = 0; i < exampleCities.length; i++) {
      exampleCities[i].style.color = "black";
    }
    for (let i = 0; i < city.length; i++) {
      city[i].style.color = "black";
    }
    for (let i = 0; i < nextDayContainers.length; i++) {
      nextDayContainers[i].style.border = "1px solid black";
    }
    weatherDetailsTitle.style.color = "black";
    cityDescContainer.style.color = "rgb(78, 78, 78)";
    cityTemp.style.color = "rgb(78, 78, 78)";
  }
  // CHUVA
  if (
    dataCidade["weather"][0]["icon"] == "10d" ||
    dataCidade["weather"][0]["icon"] == "09d"
  ) {
    weatherBackground.style.background =
      "url('https://i.ibb.co/x7SZ5LV/light-Rain.jpg')";
  }
}

function resetColors() {
  input.style.backgroundColor = "transparent";
  weatherInfo.style.background = "rgba(78, 78, 78, 0.2)";
  weatherBackground.style.backgroundPositionY = "0px";
  weatherDetailsTitle.style.color = "white";
  cityDescContainer.style.color = "white";
  cityTemp.style.color = "white";
  for (let i = 0; i < exampleCities.length; i++) {
    exampleCities[i].style.color = "rgb(197, 197, 197)";
  }
  for (let i = 0; i < city.length; i++) {
    city[i].style.color = "rgb(197, 197, 197)";
  }
  for (let i = 0; i < tempMin.length; i++) {
    tempMin[i].style.color = "rgb(168, 168, 168)";
  }
  for (let i = 0; i < nextDayContainers.length; i++) {
    nextDayContainers[i].style.border = "1px solid rgb(197, 197, 197)";
  }
}
function setNextDays(dataLocal) {
  tempXDI1.src =
    "http://openweathermap.org/img/wn/" +
    dataLocal["daily"][1]["weather"][0]["icon"] +
    "@2x.png";
  tempXDI2.src =
    "http://openweathermap.org/img/wn/" +
    dataLocal["daily"][2]["weather"][0]["icon"] +
    "@2x.png";
  tempXDI3.src =
    "http://openweathermap.org/img/wn/" +
    dataLocal["daily"][3]["weather"][0]["icon"] +
    "@2x.png";
  tempXDI4.src =
    "http://openweathermap.org/img/wn/" +
    dataLocal["daily"][4]["weather"][0]["icon"] +
    "@2x.png";
  tempXDI5.src =
    "http://openweathermap.org/img/wn/" +
    dataLocal["daily"][5]["weather"][0]["icon"] +
    "@2x.png";
  tempXDI6.src =
    "http://openweathermap.org/img/wn/" +
    dataLocal["daily"][6]["weather"][0]["icon"] +
    "@2x.png";
  tempXDI7.src =
    "http://openweathermap.org/img/wn/" +
    dataLocal["daily"][7]["weather"][0]["icon"] +
    "@2x.png";

  tempXDTMax1.innerHTML =
    Math.round(dataLocal["daily"][1]["temp"]["max"] - 273.15) + "°";
  tempXDTMax2.innerHTML =
    Math.round(dataLocal["daily"][2]["temp"]["max"] - 273.15) + "°";
  tempXDTMax3.innerHTML =
    Math.round(dataLocal["daily"][3]["temp"]["max"] - 273.15) + "°";
  tempXDTMax4.innerHTML =
    Math.round(dataLocal["daily"][4]["temp"]["max"] - 273.15) + "°";
  tempXDTMax5.innerHTML =
    Math.round(dataLocal["daily"][5]["temp"]["max"] - 273.15) + "°";
  tempXDTMax6.innerHTML =
    Math.round(dataLocal["daily"][6]["temp"]["max"] - 273.15) + "°";
  tempXDTMax7.innerHTML =
    Math.round(dataLocal["daily"][7]["temp"]["max"] - 273.15) + "°";

  tempXDTMin1.innerHTML =
    Math.round(dataLocal["daily"][1]["temp"]["min"] - 273.15) + "°";
  tempXDTMin2.innerHTML =
    Math.round(dataLocal["daily"][2]["temp"]["min"] - 273.15) + "°";
  tempXDTMin3.innerHTML =
    Math.round(dataLocal["daily"][3]["temp"]["min"] - 273.15) + "°";
  tempXDTMin4.innerHTML =
    Math.round(dataLocal["daily"][4]["temp"]["min"] - 273.15) + "°";
  tempXDTMin5.innerHTML =
    Math.round(dataLocal["daily"][5]["temp"]["min"] - 273.15) + "°";
  tempXDTMin6.innerHTML =
    Math.round(dataLocal["daily"][6]["temp"]["min"] - 273.15) + "°";
  tempXDTMin7.innerHTML =
    Math.round(dataLocal["daily"][7]["temp"]["min"] - 273.15) + "°";

  let date = new Date();
  const userUtc = date.getTimezoneOffset() / 60;
  const utc = dataLocal["timezone_offset"] / 3600;

  date.setHours(date.getHours() + userUtc);
  date.setHours(date.getHours() + utc);

  weekDayText1.innerHTML = diasSemanaAbr[date.getDay() + 1];
  weekDayText2.innerHTML = diasSemanaAbr[date.getDay() + 2];
  weekDayText3.innerHTML = diasSemanaAbr[date.getDay() + 3];
  weekDayText4.innerHTML = diasSemanaAbr[date.getDay() + 4];
  weekDayText5.innerHTML = diasSemanaAbr[date.getDay() + 5];
  weekDayText6.innerHTML = diasSemanaAbr[date.getDay() + 6];
  weekDayText7.innerHTML = diasSemanaAbr[date.getDay()];

  weekDayPre1.innerHTML = Math.round(dataLocal["daily"][1]["pop"] * 100) + "%";
  weekDayPre2.innerHTML = Math.round(dataLocal["daily"][2]["pop"] * 100) + "%";
  weekDayPre3.innerHTML = Math.round(dataLocal["daily"][3]["pop"] * 100) + "%";
  weekDayPre4.innerHTML = Math.round(dataLocal["daily"][4]["pop"] * 100) + "%";
  weekDayPre5.innerHTML = Math.round(dataLocal["daily"][5]["pop"] * 100) + "%";
  weekDayPre6.innerHTML = Math.round(dataLocal["daily"][6]["pop"] * 100) + "%";
}
function hoverErrorShow() {
  errorMsg.classList.remove("hidden");
}
function hoverErrorHide() {
  errorMsg.classList.add("hidden");
}
