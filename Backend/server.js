const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const saltRounds = 10;
const knex = require('knex');

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: 'admin',
		database: 'facerecog'
	}
});

db.select('*').from('users').then((data) => {
	console.log(data);
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.json(database.users);
});

app.post('/signin', (req, res) => {
	db
		.select('email', 'hash')
		.from('login')
		.where('email', '=', req.body.email)
		.then((data) => {
			const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
			if (isValid) {
				return db
					.select('*')
					.from('users')
					.where('email', '=', req.body.email)
					.then((user) => {
						res.json(user[0]);
					})
					.catch((err) => res.status(400).json('unable to get user'));
			} else {
				res.status(400).json('wrong credentials');
			}
		})
		.catch((err) => res.status(400).json('wrong credentials'));
});

app.post('/register', (req, res) => {
	const { email, name, password } = req.body;
	const salt = bcrypt.genSaltSync(saltRounds);
	const hash = bcrypt.hashSync(password, salt);
	// first updating the login table
	db
		.transaction((trx) => {
			trx
				.insert({
					hash: hash,
					email: email
				})
				.into('login')
				.returning('email')
				.then((loginEmail) => {
					// then inserting to users table
					return trx('users')
						.returning('*')
						.insert({
							email: loginEmail[0],
							name: name,
							joined: new Date()
						})
						.then((user) => {
							res.json(user[0]);
						});
				})
				.then(trx.commit)
				.catch(trx.rollback);
		})
		.catch((err) => res.status(400).json('unable to register'));
});

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	db
		.select('*')
		.from('users')
		.where({
			id: id
		})
		.then((user) => {
			if (user.length) {
				res.json(user[0]);
			} else {
				res.status(400).json('not found');
			}
		})
		.catch((err) => res.status(400).json('error getting user'));
});

app.put('/image', (req, res) => {
	const { id } = req.body;
	db('users')
		.where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then((entries) => {
			res.json(entries[0]);
		})
		.catch((err) => res.status(400).json('unable to get entries'));
});

app.listen(3000, () => {
	console.log('Running on port 3000');
});

/*
/ --> res = this is working
/signin  --> POST = sucess/fail
/register  --> POST = user
/profile/:userId  --> GET = user
/image  --> PUT = user
*/