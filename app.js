const { application } = require('express');
const express = require('express');
const projects = require('./data.json');

const app = express();

app.set('view-engine', 'pug');

app.use('/static', express.static('public'));

app.listen(3000, () => {
	console.log('The application is now running on localhost:3000');
});
