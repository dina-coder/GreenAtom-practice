'use strict'
const express = require('express')
const router = express.Router()
const pool = require('../config/dbconfig')
const { dbError, genericDbError, empty,
	getSuperNotificationsPath,
	getPlansAllSuperLimitedSql,
	resetNotifySuperSql,
	notificationsOnPage
} = require('../resources')

const getPlansAllSuperLimited = async super_id => {
	const result = await pool.query(getPlansAllSuperLimitedSql, super_id)
	return result[0]
}

const resetAllNotifications = async array => {
	Promise.all(array.forEach(element => pool.query(resetNotifySuperSql, element.id)))
}

router.get(getSuperNotificationsPath, async (req, res) => {
	try {
		const result = await getPlansAllSuperLimited(req.query.user_id)
		if (result[0]) {
			const size = result.length >= notificationsOnPage ? result.length - notificationsOnPage : 0
			const returnResult = result.slice(0, 5)
			resetAllNotifications(returnResult)
			returnResult.unshift(size)
			res.status(200).send(returnResult);
		}
		else
			res.status(200).send(empty)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(dbError(genericDbError))
	}
})

module.exports = router
