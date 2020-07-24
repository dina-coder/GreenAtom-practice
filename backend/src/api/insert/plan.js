'use strict'
const express = require('express')
const router = express.Router()
const { dbError, genericDbError: genericDbError,
	inserted, insertPlanPath,
	dateConvertToMySql, getPlansWorkerSql,
	extraPlanError
} = require('../../resources')
const { insertPlan, getPlans } = require('../../dbmethods')

router.post(insertPlanPath, async (req, res) => {
	req.body.date_start = req.body.date_start ? await dateConvertToMySql(req.body.date_start) : req.body.date_start
	req.body.date_end = req.body.date_end ? await dateConvertToMySql(req.body.date_end) : req.body.date_end
	try {
		const result = await getPlans(getPlansWorkerSql, req.body.worker_id)
		if (result[0])
		{
			res.status(500).send(dbError(extraPlanError))
			return
		}
		await insertPlan(req.body)
		res.status(200).send(inserted)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(dbError(genericDbError))
	}
})

module.exports = router

