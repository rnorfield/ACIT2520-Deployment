const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 8080;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('message', (text) => {
	return text.toUpperCase();
});

app.use((request, response, next) => {
	var time = new Date().toString();
	// console.log(`${time}: ${request.method} ${request.url}`);
	var log = `${time}: ${request.method} ${request.url}`;
	fs.appendFile('server.log', log + '\n', (error) => {
		if (error) {
			console.log('Unable to log message');
		}
	});
	next();
});

//Maintenance message
app.use((request, response, next) => {
	response.render('maintenance.hbs', {
		title: 'Site down',
		message: 'Site currently down for maintenance. I edited this for the second part of the challenge!'
	});
});


app.get('/', (request, response) => {
	// response.send('<h1>Hello Express!</h1>');
	response.send({
		name: 'Your Name',
		school: [
			'BCIT',
			'SFU',
			'UBC'
		]
	})
});

app.get('/info', (request, response) => {
	response.render('about.hbs', {
		title: 'About page',
		year: new Date().getFullYear(),
		welcome: 'Hello!',
		main: '/main',
		challenge: '/challenge',
		about: '/info'
	});
});

app.get('/main', (request, response) => {
	response.render('main.hbs', {
		title: 'Main page',
		year: new Date().getFullYear(),
		welcome: 'Main page',
		main: '/main',
		about: '/info',
		challenge: '/challenge'
	});
});

app.get('/challenge', (request, response) => {
	response.render('challenge.hbs', {
		title: 'Weekly challenge',
		welcome: 'Challenge page!',
		img: './img/dog.jpg',
		main: '/main',
		about: '/info',
		challenge: '/challenge'
	});
});

app.get('/maintenance', (request, response) => {
	response.render('maintenance.hbs', {
		title: 'Weekly challenge',
		welcome: 'Challenge page!',
		img: './img/dog.jpg',
		main: '/main',
		about: '/info',
		challenge: '/challenge'
	});
});


app.get('/404', (request, response) => {
	response.send({
		error: 'Page not found'
	})
})

app.listen(port, () => {
	console.log(`Server is up on the ${port}`);
});