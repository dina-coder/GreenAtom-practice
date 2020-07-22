'use strict'
const express = require('express')
const router = express.Router()
const { dbError, genericDbError,
	inserted, insertTaskPath,
	dateConvertToMySql
} = require('../../resources')
const { insertTask } = require('../../dbmethods')

router.post(insertTaskPath, async (req, res) => {
	req.body.date_start = req.body.date_start ? await dateConvertToMySql(req.body.date_start) : req.body.date_start
	req.body.date_end = req.body.date_end ? await dateConvertToMySql(req.body.date_end) : req.body.date_end
	try {
		await insertTask(req.body)
		res.status(200).send(inserted)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(dbError(genericDbError))
	}
})

module.exports = router

