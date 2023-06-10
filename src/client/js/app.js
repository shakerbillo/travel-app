/* Global Variables */
const tripCity = document.getElementById('tripCity');
const tripStartDate = document.getElementById('tripStartDate');
const tripEndDate = document.getElementById('tripEndDate');
const city = document.getElementById('city');
const country = document.getElementById('country');
const temperature = document.getElementById('temperature');
const image = document.getElementById('image');
const forecast = document.getElementById('forecast');
const population = document.getElementById('population');
const daysRemaining = document.getElementById('daysRemaining');
const duration = document.getElementById('tripLength');
const date = document.getElementById('date');
const holderEntry = document.querySelector('.holder.entry');

// Empty JS object to store UI data
let projectData = {};

// Personal API Keys and URLs
const geoNamesAPIKey = 'shakerbillo';
const geoNamesBaseURL = 'http://api.geonames.org/searchJSON?q=';

const weatherbitAPIKey = 'dd04be98839e4f02adfe0f676d05eec4';
const weatherbitBaseURL = 'https://api.weatherbit.io/v2.0/current?';
const weatherbitForecastURL = 'https://api.weatherbit.io/v2.0/forecast/daily?';

const pixabayAPIKey = '36598325-df35a1656442b769744f4cf3e';
const pixabayBaseURL = 'https://pixabay.com/api/?';


// Function to handle button click event
const handleClick = async (e) => {
	e.preventDefault();
	try {
		// Call the GET functions to fetch data from APIs
		const selectedCity = tripCity.value;
		const geoNamesData = await getGeoNames(selectedCity);

		const geoInfo = {
			population: geoNamesData.geonames[0].population,
			city: geoNamesData.geonames[0].name,
			country: geoNamesData.geonames[0].countryName,
		};

		const weatherData = await getWeatherbit(selectedCity);

		const weatherInfo = {
			startDate: tripStartDate.value, // selected date from the tripStartDate input field
			endDate: tripEndDate.value, // selected date from the tripEndDate input field
			temperature: weatherData.data[0].temp,
		};

		const forecastData = await getWeatherForecast(selectedCity);

		const forecastInfo = {
			forecast: forecastData.data[0].weather.description,
		};

		const imageData = await getImage(selectedCity);

		const imageInfo = {
			image: imageData.hits[0].webformatURL,
		};

		// Assign the API response data to the projectData object
		projectData = {
			...projectData,
			...geoInfo,
			...weatherInfo,
			...forecastInfo,
			...imageInfo,
		};

		// Call the POST functions to send the data to the server
		postGeoNames('/api', geoInfo);
		postWeatherbit('/api', weatherInfo);
		postForecast('/api', forecastInfo);
		postImage('/api', imageInfo);

		// Call the countdown function
		countdown();

		// call tripDuration function ro get the trip duration
		tripDuration();

		updateUI(); // Update UI data

		tripCity.value = ''; // Reset the input field
		tripStartDate.value = ''; // Reset the date field
		tripEndDate.value = ''; // Reset the date field
	} catch (err) {
		console.error('Error in handleClick:', err); // Display an error message if there's an error
	}
};

// Function to get city data from GeoNames API
const getGeoNames = async (city) => {
	try {
		const res = await fetch(
			`${geoNamesBaseURL}${city}&maxRows=1&username=${geoNamesAPIKey}`
		);
		const data = await res.json();
		if (!data || !data.data || data.data.length === 0) {
			throw new Error('Invalid API response');
		}

		return data;
	} catch (err) {
		console.error('Error in getGeoNames:', err); // Display an error message if there's an error
		// appropriately handle the error
	}
};

// Function to get weather data from Weatherbit API
const getWeatherbit = async (city) => {
	try {
		const res = await fetch(
			`${weatherbitBaseURL}&city=${city}&key=${weatherbitAPIKey}&include=minutely`
		);
		const data = await res.json();

		if (!data || !data.data || data.data.length === 0) {
			throw new Error('Invalid API response');
		}
		return data;
	} catch (err) {
		console.error('Error in getWeatherbit:', err); // Display an error message if there's an error
		// appropriately handle the error
	}
};

// Function to get Forecast data from Weatherbit API
const getWeatherForecast = async (city) => {
	try {
		const res = await fetch(
			`${weatherbitForecastURL}&city=${city}&key=${weatherbitAPIKey}`
		);
		const data = await res.json();
		if (!data || !data.data || data.data.length === 0) {
			throw new Error('Invalid API response');
		}
		return data;
	} catch (err) {
		console.error('Error in getWeatherForecast:', err); // Display an error message if there's an error
		// appropriately handle the error
	}
};

// Function to get image data from pixabay API
const getImage = async (city) => {
	try {
		const res = await fetch(
			`${pixabayBaseURL}key=${pixabayAPIKey}&q=${city}&image_type=photo`
		);
		const data = await res.json();
		if (!data || !data.data || data.data.length === 0) {
			throw new Error('Invalid API response');
		}
		return data;
	} catch (err) {
		console.error('Error in getImage:', err); // Display an error message if there's an error
		// appropriately handle the error
	}
};

/* Function to POST Requests data */
const postGeoNames = async (path, data) => {
	console.log(path, data);

	try {
		const res = await fetch(path, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (!res.ok) {
			throw new Error('Failed to post data');
		}

		const resData = await res.json();

		return resData;
	} catch (err) {
		console.error('Error in postGeoNames:', err); // Display an error message if there's an error
	}
};

const postWeatherbit = async (path, data) => {
	console.log(path, data);

	try {
		const res = await fetch(path, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (!res.ok) {
			throw new Error('Failed to post data');
		}

		const resData = await res.json();

		return resData;
	} catch (err) {
		console.error('Error in postWeatherbit:', err); // Display an error message if there's an error
	}
};

const postForecast = async (path, data) => {
	console.log(path, data);

	try {
		const res = await fetch(path, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (!res.ok) {
			throw new Error('Failed to post data');
		}

		const resData = await res.json();

		return resData;
	} catch (err) {
		console.error('Error in postForecast:', err); // Display an error message if there's an error
	}
};

const postImage = async (path, data) => {
	console.log(path, data);

	try {
		const res = await fetch(path, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (!res.ok) {
			throw new Error('Failed to post data');
		}

		const resData = await res.json();

		return resData;
	} catch (err) {
		console.error('Error in postImage:', err); // Display an error message if there's an error
	}
};

const countdown = () => {
	const targetDate = new Date(tripStartDate.value).getTime();

	const currentDate = new Date().getTime();
	const timeRemaining = targetDate - currentDate;

	// Calculate the difference in days  and  store it in projectData
	projectData.remainingDays = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));

	// Display the remaining days on the console
	console.log('Remaining days:', projectData.remainingDays);
};

// Calculate the trip duration in days
const tripDuration = () => {
	const startDate = new Date(tripStartDate.value);
	const endDate = new Date(tripEndDate.value);
	const timeRemaining = endDate.getTime() - startDate.getTime();
	projectData.tripLength = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));
};

// Function to update the UI with project data
const updateUI = () => {
	image.setAttribute('src', projectData.image);
	daysRemaining.innerHTML = `Your trip is ${projectData.remainingDays} days away.`;
	date.innerHTML = `Date from ${projectData.startDate} to ${projectData.endDate}`;
	city.innerHTML = `City: ${projectData.city}`;
	country.innerHTML = `Country: ${projectData.country}`;
	population.innerHTML = `Population: ${projectData.population}`;
	temperature.innerHTML = `Temperature: ${projectData.temperature} degrees Celsius`;
	forecast.innerHTML = `Forecast: ${projectData.forecast}`;
	duration.innerHTML = `Your trip will last ${projectData.tripLength} days.`;
	holderEntry.classList.remove('hidden');
};

export { handleClick };
