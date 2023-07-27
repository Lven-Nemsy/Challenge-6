const apiKey = "02722630c76da0352afa13dcb2808358";
let cityNameInput = document.querySelector("#cityName");
let searchBtn = document.querySelector(".searchBtn");

function cityLocation() {
	let cityName = cityNameInput.value;
	let requestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit5&appid=${apiKey}`;

	fetch(requestUrl)
		.then(function (response) {
			if (!response.ok) {
				throw new Error("Could not retrieve city location.");
			}
			return response.json();
		})
		.then(function (data) {
			console.log(data);
			let latitude = data[0].lat;
			let longitude = data[0].lon;

			let requestUrlTwo = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=imperial&appid=${apiKey}`;

			fetch(requestUrlTwo)
				.then(function (response) {
					if (!response.ok) {
						throw new Error("Could not retrieve weather forecast.");
					}
			//		return response.json();
				})
				.then(function (data) {
					console.log(data);
				})
				.catch(function (error) {
					console.error(error);
				});
		})
		.catch(function (error) {
			console.error(error);
		});
}

searchBtn.addEventListener("click", cityLocation);
