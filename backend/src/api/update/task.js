'use strict'
const express = require('express')
const router = express.Router()
const { dbError, genericDbError,
	updated, updateTaskPath
} = require('../../misc/resources')
const { updateTask } = require('../../misc/dbconnector')

router.put(updateTaskPath, async (req, res) => {
	try {
		const result = await updateTask(req.body)
		res.status(200).send(updated)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(dbError(genericDbError))
	}
})

module.exports = router

