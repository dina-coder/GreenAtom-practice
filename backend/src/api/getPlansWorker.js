const express = require('express')
const router = express.Router()
const pool = require('../config/dbconfig')
const { dbError, genericDbError, empty,
	getPlansWorkerPath,
	getPlansWorkerSql,
	resetNotifyWorkerSql,
	getPlanIdSql
} = require('../resources')
const { getPlans } = require('../dbmethods')

const resetNotify = async (sql, plan_id) => {
	await pool.query(sql, plan_id)
}

const getPlanId = async worker_id => {
	const result = await pool.query(getPlanIdSql, worker_id)
	return result[0] && result[0][0] ? result[0][0] : undefined
}

router.get(getPlansWorkerPath, async (req, res) => {
	try {
		const result = await getPlans(getPlansWorkerSql, req.query.user_id)
		const pid = await getPlanId(req.query.user_id)
		await resetNotify(resetNotifyWorkerSql, pid.id)
		res.status(200).send(result[0] ? result : empty)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(dbError(genericDbError))
	}
})

module.exports = router
