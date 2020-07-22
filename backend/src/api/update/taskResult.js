'use strict'
const express = require('express')
const router = express.Router()
const { dbError, genericDbError,
	updated, updateTaskResultPath
} = require('../../resources')
const { updateTaskResult } = require('../../dbmethods')

router.put(updateTaskResultPath, async (req, res) => {
	try {
		await updateTaskResult(req.body)
		res.status(200).send(updated)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(dbError(genericDbError))
	}
})

module.exports = router
