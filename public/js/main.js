const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = 'Searching for your position...';

navigator.geolocation.getCurrentPosition(
	position => {
		getWeather({ latitude: position.coords.latitude, longitude: position.coords.longitude });
	},
	error => {
		messageOne.textContent = 'Please enter city name';
	}
);

weatherForm.addEventListener('submit', e => {
	e.preventDefault();
	const location = searchElement.value;

	getWeather({ location });
});

const getWeather = ({ location, latitude, longitude }) => {
	let url = `/weather?latitude=${latitude}&longitude=${longitude}`;
	if (location) {
		url = `/weather?address=${location}`;
	}
	messageOne.textContent = 'Loading...';
	messageTwo.textContent = '';
	fetch(url).then(res => {
		res.json().then(data => {
			messageOne.textContent = '';
			if (data.error) {
				messageOne.textContent = data.error;
			} else {
				messageOne.textContent = data.location;
				messageTwo.textContent = data.forecast;
			}
		});
	});
};
