'use strict'
const express = require('express')
const router = express.Router()
const { dbError, genericDbError, deleted,
	deleteTaskPath
} = require('../../misc/resources')
const { deleteTask } = require('../../misc/dbconnector')

router.delete(deleteTaskPath, async (req, res) => {
	try {
		const result = await deleteTask(req.body.id)
		res.status(200).send(deleted)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(dbError(genericDbError))
	}
})

module.exports = router

