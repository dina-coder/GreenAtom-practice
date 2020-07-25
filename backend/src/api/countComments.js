'use strict'
const express = require('express')
const router = express.Router()
const pool = require('../config/dbconfig')
const { dbError, genericDbError, empty,
	countCommentsPath, countCommentsSql
} = require('../resources')

const countComments = async (plan_id) => {
	console.log(countCommentsSql)
	const [rows] = await pool.query(countCommentsSql, [plan_id])
	return rows[0]
}

router.get(countCommentsPath, async (req, res) => {
	try {
		const result = await countComments(req.query.plan_id)
		res.status(200).send(result ? result : empty)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(dbError(genericDbError))
	}
})

module.exports = router
