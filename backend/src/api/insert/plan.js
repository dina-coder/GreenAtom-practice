'use strict'
const express = require('express')
const router = express.Router()
const { dbError, genericDbError: genericDbError,
	inserted, insertPlanPath,
	dateConvertToMySql
} = require('../../misc/resources')
const { insertPlan } = require('../../misc/dbconnector')

router.post(insertPlanPath, async (req, res) => {
	req.body.date_start = req.body.date_start ? await dateConvertToMySql(req.body.date_start) : req.body.date_start
	req.body.date_end = req.body.date_end ? await dateConvertToMySql(req.body.date_end) : req.body.date_end
	try {
		const result = await insertPlan(req.body)
		res.status(200).send(inserted(result))
	} catch (ex) {
		console.error(ex)
		res.status(500).send(dbError(genericDbError))
	}
})

module.exports = router

