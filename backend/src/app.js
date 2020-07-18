'use strict'
if (process.env.NODE_ENV !== 'production')
	require('dotenv').config()

const express = require('express')
const cors = require('cors')
const sha1 = require('sha1')

const { generic_db_error, db_error,
	server_running, frontend_origin,
	inserted, updated, deleted,
	empty, default_express_port,
	get_worker_data_sql, get_plans_super_sql,
	get_plans_hr_sql, get_dict_grades_sql,
	get_dict_names_sql, get_dict_steps_sql,
	get_dict_positions_sql
} = require('./misc/resources')

const { login, get_tasks, get_dict,
	insert_plan, insert_task,
	update_plan, update_task,
	delete_plan, delete_task,
	get_plans } = require('./misc/dbconnector')

const app = express()
const port = process.env.EXPRESS_PORT || default_express_port

app.use(express.json())
app.use(cors({origin: frontend_origin}))

app.post('/api/login', async (req, res) => {
	try {
		const result = await login(req.body.email,
			sha1(req.body.email + req.body.password))
		res.status(200).send(result ? result : empty)
	} catch (ex) {
		res.status(500).send(db_error(generic_db_error))
	}
})

app.get('/api/get_worker_data', async (req, res) => {
	try {
		const result = await get_plans(get_worker_data_sql, req.query.user_id)
		res.status(200).send(result[0] ? result : empty)
	} catch (ex) {
		console.log(ex)
		res.status(500).send(db_error(generic_db_error))
	}
})

app.get('/api/get_tasks', async (req, res) => {
	try {
		const result = await get_tasks(req.query.plan_id)
		res.status(200).send(result[0] ? result : empty)
	} catch (ex) {
		res.status(500).send(db_error(generic_db_error))
	}
})

app.get('/api/get_plans_super', async (req, res) => {
	try {
		const result = await get_plans(get_plans_super_sql, req.query.user_id)
		res.status(200).send(result[0] ? result : empty)
	} catch (ex) {
		res.status(500).send(db_error(generic_db_error))
	}
})

app.get('/api/get_plans_hr', async (req, res) => {
	try {
		const result = await get_plans(get_plans_hr_sql)
		res.status(200).send(result[0] ? result : empty)
	} catch (ex) {
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
