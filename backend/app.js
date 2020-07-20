'use strict'
if (process.env.NODE_ENV !== 'production')
	require('dotenv').config()

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const { server_running, frontend_origin,
	default_express_port, api_path,
	morgan_string
} = require('./misc/resources')

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
const insertPlanRouter = require('./api/insert/plan')
const insertTaskRouter = require('./api/insert/task')
const updatePlanRouter = require('./api/update/plan')
const updateTaskRouter = require('./api/update/task')
const deletePlanRouter = require('./api/delete/plan')
const deleteTaskRouter = require('./api/delete/task')

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
app.use(api_path, insertPlanRouter);
app.use(api_path, insertTaskRouter);
app.use(api_path, updatePlanRouter);
app.use(api_path, updateTaskRouter);
app.use(api_path, deletePlanRouter);
app.use(api_path, deleteTaskRouter);

app.listen(port, _ => {
	console.log(server_running(port))
})

module.exports = app
