
const apiKey = "02722630c76da0352afa13dcb2808358";
let cityNameInput = document.querySelector("#cityName");
let searchBtn = document.querySelector(".searchBtn");
let cityBtn = document.querySelector("button.cityBtn");
let cityList = document.querySelector(".cityList");
let searchedCities = JSON.parse(localStorage.getItem('searchedCities')) || [];


function cityLocation(city) {
	let cityName = cityNameInput.value;
	weather(cityName);
	forecast(cityName);
	saveInput(cityName);
	loadInput(cityName);
	if (cityList) {
		searchedCities.push(cityName);
		localStorage.setItem('searchedCities', JSON.stringify(searchedCities));

		let listItem = document.createElement("li");
		listItem.textContent = cityName;
		cityList.appendChild(listItem);
	}
}

function loadCities() {
	if (cityList) {
		for (let i = 0; i < searchedCities.length; i++) {
			var listItem = document.createElement("li");
			listItem.textContent = searchedCities[i];
			cityList.appendChild(listItem);

			var cityBtn = document.createElement("button");
			cityBtn.textContent = searchedCities[i];
			cityBtn.addEventListener("click", function () {
				weather(cityBtn.textContent);
				forecast(cityBtn.textContent);
			});
			cityList.appendChild(cityName, cityBtn, listItem);
		}

		.catch((error) => {
			console.error(error);
		});
	}
}

for (let i = 0; i < arrayItems.length; i++) {
	var cityName = document.createElement("h1");
	var cityTime = document.createElement("h1");
	var temp = document.createElement("p");
	var wind = document.createElement("p");
	var humid = document.createElement("p");

	cityTime.textContent = "At " + arrayItems[i].dt_txt;
	temp.textContent = "Temp: " + arrayItems[i].main.temp;
	wind.textContent = "Wind: " + arrayItems[i].wind.speed;
	humid.textContent = "Humidity:" + arrayItems[i].main.humidity;
	forecastWeatherContainer.append(cityName, cityTime, temp, wind, humid);
}




function saveInput() {
	var inputText = cityNameInput.value;
	localStorage.setItem("saveInput", inputText);
}

function loadInput() {
	var savedText = localStorage.getItem("saveInput");
	cityNameInput.value = savedText;
}

loadCities();

function forecast(city) {
	let requestUrlTwo = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

	fetch(requestUrlTwo)
		.then(function (response) {
			if (!response.ok) {
				throw new Error("Could not retrieve weather forecast.");
			}
			return response.json();
		})
		.then(function (data) {
			console.log(data);
			var arrayItems = [
				data.list[2],
				data.list[10],
				data.list[18],
				data.list[26],
				data.list[34],
			];

			var forecastWeatherContainer = document.getElementById("forecast");
			forecastWeatherContainer.innerHTML = "";

			for (let i = 0; i < arrayItems.length; i++) {
				var cityName = document.createElement("h1");
				var cityTime = document.createElement("h1");
				var temp = document.createElement("p");
				var wind = document.createElement("p");
				var humid = document.createElement("p");

				cityTime.textContent = "At " + arrayItems[i].dt_txt;
				temp.textContent = "Temp: " + arrayItems[i].main.temp;
				wind.textContent = "Wind: " + arrayItems[i].wind.speed;
				humid.textContent = "Humidity:" + arrayItems[i].main.humidity;
				forecastWeatherContainer.append(cityName, cityTime, temp, wind, humid);
			}
		})
		.catch(function (error) {
			console.error(error);
		});
}

function weather(city) {
	let requestUrlTwo = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

	fetch(requestUrlTwo)
		.then(function (response) {
			if (!response.ok) {
				throw new Error("Could not retrieve weather forecast.");
			}
			return response.json();
		})
		.then(function (data) {
			var currentWeatherContainer = document.getElementById("current");

			currentWeatherContainer.innerHTML = "";

			var cityName = document.createElement("h1");
			var temp = document.createElement("p");
			var wind = document.createElement("p");
			var humid = document.createElement("p");

			cityName.textContent = data.name;
			temp.textContent = "Temp: " + data.main.temp;
			wind.textContent = "Wind: " + data.wind.speed;
			humid.textContent = "Humidity:" + data.main.humidity;

			currentWeatherContainer.append(cityName, temp, wind, humid);
		})
		.catch(function (error) {
			console.error(error);
		});
}


searchBtn.addEventListener("click", cityLocation);
