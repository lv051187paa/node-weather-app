const request = require('request');

const geocode = (address, callback) => {
	const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibHYwNTExODdwYWEiLCJhIjoiY2p6bW0yOGd4MGUxZjNucDd6MnI3b3E0ZiJ9.zdiyns1NvAtIKtf6VWrEjA&limit=1`;

	request({ url: geoUrl, json: true }, (err, res) => {
		if (err) {
			callback('Some problems with connection', undefined);
		} else if (res.body.message || !res.body.features.length) {
			callback('Geodata request problems', undefined);
		} else {
			const latitude = res.body.features[0].center[1];
			const longtitude = res.body.features[0].center[0];
			const placeName = res.body.features[0].place_name;
			callback(undefined, { latitude, longtitude, placeName });
		}
	});
};

module.exports = geocode;
