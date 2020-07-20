'use strict'
if (process.env.NODE_ENV !== 'production')
	require('dotenv').config()

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const { serverRunning, frontendOrigin,
	defaultExpressPort, apiPath,
	morganString
} = require('./misc/resources')

const app = express()
const port = process.env.EXPRESS_PORT || defaultExpressPort

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
app.use(cors({origin: frontendOrigin}))
app.use(morgan(morganString))
app.use(apiPath, loginRouter)
app.use(apiPath, getPlansWorkerRouter)
app.use(apiPath, getTasksRouter)
app.use(apiPath, getPlansSuperRouter)
app.use(apiPath, getPlansHrRouter)
app.use(apiPath, getDictGradesRouter)
app.use(apiPath, getDictStepsRouter)
app.use(apiPath, getDictNamesRouter)
app.use(apiPath, getDictPositionsRouter)
app.use(apiPath, insertPlanRouter);
app.use(apiPath, insertTaskRouter);
app.use(apiPath, updatePlanRouter);
app.use(apiPath, updateTaskRouter);
app.use(apiPath, deletePlanRouter);
app.use(apiPath, deleteTaskRouter);

app.listen(port, _ => {
	console.log(serverRunning(port))
})

module.exports = app
