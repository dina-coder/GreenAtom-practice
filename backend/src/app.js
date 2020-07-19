'use strict'
if (process.env.NODE_ENV !== 'production')
	require('dotenv').config()

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const { generic_db_error, db_error,
	server_running, frontend_origin,
	inserted, updated, deleted,
	empty, default_express_port, get_plans_worker_sql,
	get_plans_super_sql, get_plans_hr_sql,
	get_dict_grades_sql, get_dict_names_sql,
	get_dict_steps_sql, get_dict_positions_sql, api_path, morgan_string
} = require('./misc/resources')

const { get_dict,
	insert_plan, insert_task,
	update_plan, update_task,
	delete_plan, delete_task,
	get_plans } = require('./misc/dbconnector')

const app = express()
const port = process.env.EXPRESS_PORT || default_express_port

const loginRouter = require('./api/login')
const getPlansWorkerRouter = require('./api/getPlansWorker')
const getTasksRouter = require('./api/getTasks')
const getPlansSuperRouter = require('./api/getPlansSuper')

app.use(express.json())
app.use(cors({origin: frontend_origin}))
app.use(morgan(morgan_string))
app.use(api_path, loginRouter)
app.use(api_path, getPlansWorkerRouter)
app.use(api_path, getTasksRouter)
app.use(api_path, getPlansSuperRouter)

app.get('/api/get_plans_hr', async (req, res) => {
	try {
		const result = await get_plans(get_plans_hr_sql, undefined, req.query.page)
		res.status(200).send(result[0] ? result : empty)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(db_error(generic_db_error))
	}
})

app.get('/api/dict/grades', async (req, res) => {
	try {
		const result = await get_dict(get_dict_grades_sql)
		res.status(200).send(result[0] ? result : empty)
	} catch (ex) {
		res.status(500).send(db_error(generic_db_error))
	}
})

app.get('/api/dict/names', async (req, res) => {
	try {
		const result = await get_dict(get_dict_names_sql, req.query.role_id)
		res.status(200).send(result[0] ? result : empty)
	} catch (ex) {
		res.status(500).send(db_error(generic_db_error))
	}
})

app.get('/api/dict/steps', async (req, res) => {
	try {
		const result = await get_dict(get_dict_steps_sql)
		res.status(200).send(result[0] ? result : empty)
	} catch (ex) {
		res.status(500).send(db_error(generic_db_error))
	}
})

app.get('/api/dict/positions', async (req, res) => {
	try {
		const result = await get_dict(get_dict_positions_sql)
		res.status(200).send(result[0] ? result : empty)
	} catch (ex) {
		res.status(500).send(db_error(generic_db_error))
	}
})

app.post('/api/insert/plan', (req, res) => {
	insert_plan(req.body, (err, result) => {
		if (err)
			res.status(500).send(db_error(generic_db_error))
		res.status(200).send(inserted)
	})
})

app.post('/api/insert/task', (req, res) => {
	insert_task(req.body, (err, result) => {
		if (err)
			res.status(500).send(db_error(generic_db_error))
		res.status(200).send(inserted)
	})
})

app.put('/api/update/plan', (req, res) => {
	update_plan(req.body, (err, result) => {
		if (err)
			res.status(500).send(db_error(generic_db_error))
		res.status(200).send(updated)
	})
})

app.put('/api/update/task', (req, res) => {
	update_task(req.body, (err, result) => {
		if (err)
			res.status(500).send(db_error(generic_db_error))
		res.status(200).send(updated)
	})
})

app.delete('/api/delete/plan', (req, res) => {
	delete_plan(req.body.id, (err, result) => {
		if (err)
			res.status(500).send(db_error(generic_db_error))
		res.status(200).send(deleted)
	})
})

app.delete('/api/delete/task', (req, res) => {
	delete_task(req.body.id, (err, result) => {
		if (err)
			res.status(500).send(db_error(generic_db_error))
		res.status(200).send(deleted)
	})
})

app.listen(port, _ => {
	console.log(server_running(port))
})

module.exports = app
