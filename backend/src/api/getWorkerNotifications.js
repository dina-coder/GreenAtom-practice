'use strict'
const express = require('express')
const router = express.Router()
const pool = require('../config/dbconfig')
const { dbError, genericDbError, empty,
	getWorkerNotificationPath,
	resetNotifyWorkerSql,
	getWorkerNotificationSql
} = require('../resources')

const getNotification = async worker_id => {
	const result = await pool.query(getWorkerNotificationSql, worker_id)
	return result[0][0]
}

const resetNotification = async id => {
	await pool.query(resetNotifyWorkerSql, id)
}

router.get(getWorkerNotificationPath, async (req, res) => {
	try {
		const result = await getNotification(req.query.user_id)
		console.log(result)
		if (result) {
			await resetNotification(result.id)
			res.status(200).send(result);
		}
		else
			res.status(200).send(empty)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(dbError(genericDbError))
	}
})

module.exports = router
