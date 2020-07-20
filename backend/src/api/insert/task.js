'use strict'
const express = require('express')
const router = express.Router()
const { dbError, genericDbError: genericDbError,
	inserted, insertTaskPath: insertTaskPath
} = require('../../misc/resources')
const { insertTask } = require('../../misc/dbconnector')

router.post(insertTaskPath, async (req, res) => {
	try {
		await insertTask(req.body)
		res.status(200).send(inserted)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(dbError(genericDbError))
	}
})

module.exports = router

