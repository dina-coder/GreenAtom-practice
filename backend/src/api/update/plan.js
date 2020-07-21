'use strict'
const express = require('express')
const router = express.Router()
const { dbError, genericDbError,
	updated, updatePlanPath,
	dateConvertToMySql
} = require('../../misc/resources')
const { updatePlan } = require('../../misc/dbconnector')

router.put(updatePlanPath, async (req, res) => {
	req.body.date_start = req.body.date_start ? await dateConvertToMySql(req.body.date_start) : req.body.date_start
	req.body.date_end = req.body.date_end ? await dateConvertToMySql(req.body.date_end) : req.body.date_end
	try {
		await updatePlan(req.body)
		res.status(200).send(updated)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(dbError(genericDbError))
	}
})

module.exports = router

