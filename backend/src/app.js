'use strict'
if (process.env.NODE_ENV !== 'production')
	require('dotenv').config()

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const { generic_db_error, db_error,
	server_running, frontend_origin,
	inserted, updated, deleted,
	empty, default_express_port,
	get_dict_grades_sql, get_dict_names_sql,
	get_dict_steps_sql, get_dict_positions_sql, api_path, morgan_string
} = require('./misc/resources')

const { get_dict,
	insert_plan, insert_task,
	update_plan, update_task,
	delete_plan, delete_task } = require('./misc/dbconnector')

const app = express()
const port = process.env.EXPRESS_PORT || default_express_port

const loginRouter = require('./api/login')
const getPlansWorkerRouter = require('./api/getPlansWorker')
const getTasksRouter = require('./api/getTasks')
const getPlansSuperRouter = require('./api/getPlansSuper')
const getPlansHrRouter = require('./api/getPlansHr')
const getDictGradesRouter = require('./api/dict/grades')
const getDictStepsRouter = require('./api/dict/steps')
const getDictNamesRouter = require('./api/dict/names')
const getDictPositionsRouter = require('./api/dict/positions')

app.use(express.json())
app.use(cors({origin: frontend_origin}))
app.use(morgan(morgan_string))
app.use(api_path, loginRouter)
app.use(api_path, getPlansWorkerRouter)
app.use(api_path, getTasksRouter)
app.use(api_path, getPlansSuperRouter)
app.use(api_path, getPlansHrRouter)
app.use(api_path, getDictGradesRouter)
app.use(api_path, getDictStepsRouter)
app.use(api_path, getDictNamesRouter)
app.use(api_path, getDictPositionsRouter)

app.post('/api/insert/plan', async (req, res) => {
	try {
		const result = await insert_plan(req.body)
		res.status(200).send(inserted)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(db_error(generic_db_error))
	}
})

app.post('/api/insert/task', async (req, res) => {
	try {
		const result = await insert_task(req.body)
		res.status(200).send(inserted)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(db_error(generic_db_error))
	}
})

app.put('/api/update/plan', async (req, res) => {
	try {
		const result = await update_plan(req.body)
		res.status(200).send(updated)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(db_error(generic_db_error))
	}
})

app.put('/api/update/task', async (req, res) => {
	try {
		const result = await update_task(req.body)
		res.status(200).send(updated)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(db_error(generic_db_error))
	}
})

app.delete('/api/delete/plan', async (req, res) => {
	try {
		const result = await delete_plan(req.body.id)
		res.status(200).send(deleted)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(db_error(generic_db_error))
	}
})

app.delete('/api/delete/task', async (req, res) => {
	try {
		const result = await delete_task(req.body.id)
		res.status(200).send(deleted)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(db_error(generic_db_error))
	}
})

app.listen(port, _ => {
	console.log(server_running(port))
})

module.exports = app
