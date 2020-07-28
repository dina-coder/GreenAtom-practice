'use strict'
const express = require('express')
const router = express.Router()
const pool = require('../../config/dbconfig')
const { dbError, genericDbError,
	updated, updatePlanPath,
	dateConvertToMySql,
	notifySuperSql,
	notifyWorkerSql,
	getStepIdSql
} = require('../../resources')
const { updatePlan } = require('../../dbmethods')

const getStepId = async plan_id => {
	const result = await pool.query(getStepIdSql, plan_id)
	return result[0][0]
}

const notify = async (sql, plan_id) => {
	await pool.query(sql, plan_id)
}

router.put(updatePlanPath, async (req, res) => {
	req.body.date_start = req.body.date_start ? await dateConvertToMySql(req.body.date_start) : req.body.date_start
	req.body.date_end = req.body.date_end ? await dateConvertToMySql(req.body.date_end) : req.body.date_end
	try {
		const oldResult = await getStepId(req.body.id)
		if (oldResult.step_id !== req.body.step_id) {
			if (oldResult.step_id === 1 && req.body.step_id === 2)
				await notify(notifyWorkerSql, req.body.id)
			else if (oldResult.step_id === 2 && req.body.step_id === 3)
				await notify(notifySuperSql, req.body.id)
			else if (oldResult.step_id === 3 && req.body.step_id === 4)
				await notify(notifyWorkerSql, req.body.id)
			else if (oldResult.step_id === 4 && req.body.step_id === 5)
				await notify(notifySuperSql, req.body.id)
			else if (oldResult.step_id === 5 && req.body.step_id === 6)
				await notify(notifyWorkerSql, req.body.id)
		}
		await updatePlan(req.body)
		res.status(200).send(updated)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(dbError(genericDbError))
	}
})

module.exports = router

