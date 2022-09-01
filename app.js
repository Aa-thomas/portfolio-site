const express = require('express');
const projects = require('./data.json').projects;

const app = express();

app.set('view engine', 'pug');
app.use('/static', express.static('public'));
app.use(express.static('images'));

/* Routes */
app.get('/', (req, res) => {
	res.render('index', { projects });
});

app.get('/about', (req, res) => {
	res.render('about');
});

app.get('/project/:id', (req, res) => {
	const project = projects[req.params.id];

	res.render('project', { project });
});

/* ERROR HANDLERS */
/* 404 handler to catch undefined and non-existent route requests */
app.use((req, res, next) => {
	const err = new Error();
	err.status = 404;
	err.message = `Oh no! It looks like the page you're looking for doesn't exist`;
	console.log('404 error handler called', err);
	res.status(404).render('page-not-found', { err });
	next(err);
});

/* Global Error Handler */
app.use((err, req, res, next) => {
	if (err) {
		console.log('Global error handler called', { err });
	}
	if (err.status === 404) {
		res.status(404).render('page-not-found', { err });
	} else {
		err.status = err.status || 500;
		err.message =
			err.message ||
			`Oops! It looks like something went wrong on the server.`;
		res.status(err.status).render('error', { err });
	}
});

app.listen(3000, () => {
	console.log('The application is now running on localhost:3000');
});
