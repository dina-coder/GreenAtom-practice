'use strict'
const express = require('express')
const router = express.Router()
const { dbError, genericDbError, deleted,
	deleteTaskPath
} = require('../../resources')
const { deleteTask } = require('../../dbmethods')

router.delete(deleteTaskPath, async (req, res) => {
	try {
		await deleteTask(req.body.id)
		res.status(200).send(deleted)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(dbError(genericDbError))
	}
})

module.exports = router

