'use strict'
const express = require('express')
const router = express.Router()
const { dbError, genericDbError, empty,
	countTasksPath } = require('../resources')
const { countTasks } = require('../dbmethods')

router.get(countTasksPath, async (req, res) => {
	try {
		const result = await countTasks(req.query.plan_id)
		res.status(200).send(result ? result : empty)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(dbError(genericDbError))
	}
})

module.exports = router

