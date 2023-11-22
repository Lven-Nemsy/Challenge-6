const apiKey = "02722630c76da0352afa13dcb2808358";
let cityNameInput = document.querySelector("#cityName");
let searchBtn = document.querySelector(".searchBtn");
//let cityBtn = cityNameInput.value
let cityBtn = document.querySelector("button.cityBtn");
let history = JSON.parse(localStorage.getItem("history")) || [];
//  cityNameInput;

// localStorage.setItem

// cityBtn.textContent = (function saveInput() {
// 	var inputText = cityNameInput.value;
// 	localStorage.setItem("saveInput", inputText);
// })
//     function loadInput() {
// 	    var savedText = localStorage.getItem("saveInput");
// 	    cityNameInput.value = savedText;
// };

function storeLocalStorage(city) {
	if (!history.includes(city)) {
		history.push(city);
		localStorage.setItem("history", JSON.stringify(history));
		createListItem(city);
	}
}

function cityLocation() {
	let cityName = cityNameInput.value;
	weather(cityName);
	forecast(cityName);
}

function createListItem(city) {
	var p = document.createElement("button");
	p.textContent = city;
	p.addEventListener("click", function () {
		weather(city);
		forecast(city);
	});
	document.getElementById("searchHistory").appendChild(p);
}

function runOnLoad(){
	for (let i = 0; i < history.length; i++) {
		createListItem(history[i]);
	}
}
runOnLoad()

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
				var div = document.createElement("div");
				var cityName = document.createElement("h1");
				var cityTime = document.createElement("h1");
				var temp = document.createElement("p");
				var wind = document.createElement("p");
				var humid = document.createElement("p");
				let formatDate = new Date(arrayItems[i].dt * 1000)

				//cityName.textContent = data.name;
				cityTime.textContent = "At " +formatDate.toLocaleDateString() ;
				temp.textContent = "Temp: " + arrayItems[i].main.temp;
				wind.textContent = "Wind: " + arrayItems[i].wind.speed;
				humid.textContent = "Humidity:" + arrayItems[i].main.humidity;
				div.append(cityName, cityTime, temp, wind, humid);
				forecastWeatherContainer.append(div);
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

			storeLocalStorage(data.name);
	
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
