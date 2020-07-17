if (process.env.NODE_ENV !== 'production')
	require('dotenv').config()

const express = require('express')
const cors = require('cors')

const dbconnect = require('./dbconnector')
const hashing = require('./hashing')
const { db_error, server_running, frontend_origin } = require('./resources')
const { get_user, get_worker_data, get_user_name, get_tasks,
	get_plans_super, get_plans_hr, get_dict_grades, get_dict_names,
	get_dict_steps, get_dict_positions, insert_plan, insert_task,
	update_plan, update_task, delete_plan, delete_task } = require('./dbconnector')

const app = express()
const port = process.env.EXPRESS_PORT || 9000

app.use(express.json())
app.use(cors({ origin: frontend_origin }))

app.post('/api/login', (req, res) => {
	console.log(db_error)
	get_user(req.body.email, hashing(req.body.email, req.body.password), async (err, result) => {
		await result
		if (err)
			res.status(500).send({error_message: db_error, error_flag: true})
		res.status(200).send(result ? result : {empty: true})
	})
})

app.get('/api/get_worker_data', (req, res) => {
	get_worker_data(req.query.user_id, (err, result) => {
		if (err)
			res.status(500).send({error_message: db_error, error_flag: true})
		res.status(200).send(result ? result : {empty: true})
	})
})

app.get('/api/get_user_name', (req, res) => {
	get_user_name(req.query.user_id, (err, result) => {
		if (err)
			res.status(500).send({error_message: db_error, error_flag: true})
		res.status(200).send(result ? result : {empty: true})
	})
})

app.get('/api/get_tasks', (req, res) => {
	get_tasks(req.query.plan_id, (err, result) => {
		if (err)
			res.status(500).send({error_message: db_error, error_flag: true})
			res.status(200).send(result[0] ? result : {empty: true})
	})
})

app.get('/api/get_plans_super', (req, res) => {
	get_plans_super(req.query.user_id, async (err, result) => {
		await result
		if (err)
			res.status(500).send({error_message: db_error, error_flag: true})
		res.status(200).send(result[0] ? result : {empty: true})
	})
})

app.get('/api/get_plans_hr', (req, res) => {
	get_plans_hr(async (err, result) => {
		await result
		if (err)
			res.status(500).send({error_message: db_error, error_flag: true})
		res.status(200).send(result[0] ? result : {empty: true})
	})
})

app.get('/api/dict/grades', (req, res) => {
	get_dict_grades((err, result) => {
		if (err)
			res.status(500).send({error_message: db_error, error_flag: true})
		res.status(200).send(result[0] ? result : {empty: true})
	})
})

app.get('/api/dict/names', (req, res) => {
	get_dict_names(req.query.role_id, (err, result) => {
		if (err)
			res.status(500).send({error_message: db_error, error_flag: true})
		res.status(200).send(result[0] ? result : {empty: true})
	})
})

app.get('/api/dict/steps', (req, res) => {
	get_dict_steps((err, result) => {
		if (err)
			res.status(500).send({error_message: db_error, error_flag: true})
		res.status(200).send(result[0] ? result : {empty: true})
	})
})

app.get('/api/dict/positions', (req, res) => {
	get_dict_positions((err, result) => {
		if (err)
			res.status(500).send({error_message: db_error, error_flag: true})
		res.status(200).send(result[0] ? result : {empty: true})
	})
})

app.post('/api/insert/plan', (req, res) => {
	insert_plan(req.body, (err, result) => {
		if (err)
			res.status(500).send({error_message: db_error, error_flag: true})
		res.status(200).send({inserted : result ? true : false})
	})
})

app.post('/api/insert/task', (req, res) => {
	insert_task(req.body, (err, result) => {
		if (err)
			res.status(500).send({error_message: db_error, error_flag: true})
		res.status(200).send({inserted : result ? true : false})
	})
})

app.put('/api/update/plan', (req, res) => {
	update_plan(req.body, (err, result) => {
		if (err)
			res.status(500).send({error_message: db_error, error_flag: true})
		res.status(200).send({updated : result ? true : false})
	})
})

app.put('/api/update/task', (req, res) => {
	update_task(req.body, (err, result) => {
		if (err)
			res.status(500).send({error_message: db_error, error_flag: true})
		res.status(200).send({updated : result ? true : false})
	})
})

app.delete('/api/delete/plan', (req, res) => {
	delete_plan(req.body.id, (err, result) => {
		if (err)
			res.status(500).send({error_message: db_error, error_flag: true})
		res.status(200).send({deleted : result ? true : false})
	})
})

app.delete('/api/delete/task', (req, res) => {
	delete_task(req.body.id, (err, result) => {
		if (err)
			res.status(500).send({error_message: db_error, error_flag: true})
		res.status(200).send({deleted : result ? true : false})
	})
})

app.listen(port, _ => {
	console.log(server_running(port))
})
