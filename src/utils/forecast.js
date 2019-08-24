const request = require('request');

const forecast = (data, callback) => {
	const url = `https://api.darksky.net/forecast/cacad9b77711695cc6b0b7b17c3520c9/${data.latitude},${data.longtitude}?units=si`;

	request({ url, json: true }, (err, res) => {
		if (err) {
			callback('Some problems with connection', undefined);
		} else if (res.body.error) {
			callback(res.body.error, undefined);
		} else {
			callback(
				undefined,
				`${res.body.daily.data[0].summary} It is currently ${res.body.currently
					.temperature} degrees out. There  is a ${res.body.currently.precipProbability}% of rain`
			);
		}
	});
};

module.exports = forecast;
