if (process.env.NODE_ENV !== 'production')
	require('dotenv').config()

const express = require('express')
const cors = require('cors')

const hashing = require('./misc/hashing')
const { db_error, server_running, frontend_origin, inserted, updated, deleted,
	empty, default_express_port } = require('./misc/resources')
const { get_user, get_worker_data, get_user_name, get_tasks,
	get_plans_super, get_plans_hr, get_dict_grades, get_dict_names } = require('./misc/dbconnector')

const app = express()
const dbconnect = require('./misc/dbconnector')
const port = process.env.EXPRESS_PORT || 9000

//app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors({
	origin: "http://localhost:3000"
}))

/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/

app.post('/api/login', (req, res) => {
	get_user(req.body.email, hashing(req.body.email, req.body.password), async (err, result) => {
		await result
		if (err)
			res.status(500).send({error_message: "Невозможно подключиться к БД", error_flag: true})
		res.status(200).send(result ? result : {empty: true})
	})
})

app.get('/api/get_worker_data', (req, res) => {
	get_worker_data(req.query.user_id, (err, result) => {
		if (err)
			res.status(500).send({error_message: "Невозможно подключиться к БД", error_flag: true})
		res.status(200).send(result ? result : {empty: true})
	})
})

app.get('/api/get_user_name', (req, res) => {
	get_user_name(req.query.user_id, (err, result) => {
		if (err)
			res.status(500).send({error_message: "Невозможно подключиться к БД", error_flag: true})
		res.status(200).send(result ? result : {empty: true})
	})
})

app.get('/api/get_tasks', (req, res) => {
	get_tasks(req.query.plan_id, (err, result) => {
		if (err)
			res.status(500).send({error_message: "Невозможно подключиться к БД", error_flag: true})
			res.status(200).send(result[0] ? result : {empty: true})
	})
})

app.get('/api/get_plans_super', (req, res) => {
	get_plans_super(req.query.user_id, async (err, result) => {
		await result
		if (err)
			res.status(500).send({error_message: "Невозможно подключиться к БД", error_flag: true})
		res.status(200).send(result[0] ? result : {empty: true})
	})
})

app.get('/api/get_plans_hr', (req, res) => {
	get_plans_hr(async (err, result) => {
		await result
		if (err)
			res.status(500).send({error_message: "Невозможно подключиться к БД", error_flag: true})
		res.status(200).send(result[0] ? result : {empty: true})
	})
})

app.get('/api/dict/grades', (req, res) => {
	get_dict_grades((err, result) => {
		if (err)
			res.status(500).send({error_message: "Невозможно подключиться к БД", error_flag: true})
		res.status(200).send(result[0] ? result : {empty: true})
	})
})

app.get('/api/dict/names', (req, res) => {
	get_dict_names(req.query.role_id, (err, result) => {
		if (err)
			res.status(500).send({error_message: "Невозможно подключиться к БД", error_flag: true})
		res.status(200).send(result ? result : {empty: true})
	})
})

app.listen(port, _ => {
	console.log(`Сервер запущен по адресу: http://localhost:${port}`)
})