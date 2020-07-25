'use strict'
if (process.env.NODE_ENV !== 'production')
	require('dotenv').config()

const cors = require('cors')
const express = require('express')
const morgan = require('morgan')

const { serverRunning, frontendOrigin,
	defaultExpressPort, apiPath,
	morganString } = require('./resources')

const loginRouter = require('./api/login')
const getPlansWorkerRouter = require('./api/getPlansWorker')
const getPlansSuperRouter = require('./api/getPlansSuper')
const getPlansHrRouter = require('./api/getPlansHr')
const getTasksRouter = require('./api/getTasks')
const getDictGradesRouter = require('./api/dict/grades')
const getDictStepsRouter = require('./api/dict/steps')
const getDictNamesRouter = require('./api/dict/names')
const getDictPositionsRouter = require('./api/dict/positions')
const insertPlanRouter = require('./api/insert/plan')
const insertTaskRouter = require('./api/insert/task')
const updatePlanRouter = require('./api/update/plan')
const updateTaskRouter = require('./api/update/task')
const updateTaskResultRouter = require('./api/update/taskResult')
const deletePlanRouter = require('./api/delete/plan')
const deleteTaskRouter = require('./api/delete/task')
const countTasksRouter = require('./api/countTasks')
const countPlansRouter = require('./api/countPlans')
const getPlansSuperFilteredRouter = require('./api/getPlansSuperFiltered')
const getPlansHrFilteredRouter = require('./api/getPlansHrFiltered')
const getCommentsRouter = require('./api/getComments')
const insertCommentRouter = require('./api/insert/comment')
const countCommentRouter = require('./api/countComments')

const port = process.env.EXPRESS_PORT || defaultExpressPort

const app = express()

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
app.use(apiPath, insertPlanRouter)
app.use(apiPath, insertTaskRouter)
app.use(apiPath, updatePlanRouter)
app.use(apiPath, updateTaskRouter)
app.use(apiPath, updateTaskResultRouter)
app.use(apiPath, deletePlanRouter)
app.use(apiPath, deleteTaskRouter)
app.use(apiPath, countTasksRouter)
app.use(apiPath, countPlansRouter)
app.use(apiPath, getPlansSuperFilteredRouter)
app.use(apiPath, getPlansHrFilteredRouter)
app.use(apiPath, getCommentsRouter)
app.use(apiPath, insertCommentRouter)
app.use(apiPath, countCommentRouter)

app.listen(port, () => console.log(serverRunning(port)))

module.exports = app
