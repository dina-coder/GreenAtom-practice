'use strict'
const express = require('express')
const router = express.Router()
const pool = require('../config/dbconfig')
const { dbError, genericDbError, empty,
	getCommentsPath, getCommentsSql,
	commentsOnPage
} = require('../resources')

const getComments = async (plan_id, page) => {
	const [rows] = await pool.query(getCommentsSql,
		[plan_id,
		page * commentsOnPage - commentsOnPage,
		commentsOnPage])
	return rows
}

const dateCrutch = date => {
	const parts = date.split('-')
	const partsTime = parts[1].split(':')
	partsTime[0] = parseInt(partsTime[0]) + 3
	if (partsTime[0] >= 24)
		partsTime[0] -= 24
	parts[1] = partsTime.join(':')
	return parts.join('-')
}

router.get(getCommentsPath, async (req, res) => {
	try {
		const result = await getComments(req.query.plan_id, req.query.page)
		await Promise.all(result.map(element => {
			if (element.date_creation)
				element.date_creation = dateCrutch(element.date_creation)
			return element
		}))
		res.status(200).send(result[0] ? result.slice((req.query.page - 1) * 5, req.query.page * 5).reverse() : empty)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(dbError(genericDbError))
	}
})

module.exports = router
