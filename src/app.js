const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || '3000';

//Define paths
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views  directory
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

//Setup static directory to use
app.use(express.static(publicDirectory));

app.get('/', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Andy'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: 'Andy'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		name: 'Andy'
	});
});

app.get('/weather', (req, res) => {
	const { address, latitude, longitude } = req.query;

	geocode({ address, latitude, longitude }, (error, data) => {
		if (error) {
			return res.send({
				error
			});
		}
		if (!address && !latitude && !longitude) {
			return res.send({
				error: 'An address must be provided'
			});
		}
		forecast(data, (error, forecastData) => {
			if (error) {
				return res.send({
					error
				});
			}
			res.send({
				location: data.placeName,
				forecast: forecastData
			});
		});
	});
});

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'You must provide a search term'
		});
	}
	console.log(req.query.search);
	res.send({ products: [] });
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		message: 'Help article not found',
		title: '404',
		name: 'Andy'
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		message: 'My 404 page',
		title: '404',
		name: 'Andy'
	});
});

app.listen(port, () => console.log(`Listnening to port ${port}...`));
