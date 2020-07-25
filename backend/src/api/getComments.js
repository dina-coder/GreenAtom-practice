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

router.get(getCommentsPath, async (req, res) => {
	try {
		const result = await getComments(req.query.plan_id, req.query.page)
		res.status(200).send(result[0] ? result.slice((req.query.page - 1) * 5, req.query.page * 5) : empty)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(dbError(genericDbError))
	}
})

module.exports = router
