'use strict'
const express = require('express')
const router = express.Router()
const pool = require('../../config/dbconfig')
const { dbError, genericDbError,
	inserted, insertCommentPath,
	dateConvertToMySql, insertCommentSql
} = require('../../resources')

const insertComment = async data => {
	await pool.query(insertCommentSql,
	[
		data.plan_id,
		data.user_id,
		data.content
	])
}

router.post(insertCommentPath, async (req, res) => {
	req.body.date_creation = req.body.date_creation ? await dateConvertToMySql(req.body.date_creation) : req.body.date_creation
	try {
		await insertComment(req.body)
		res.status(200).send(inserted)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(dbError(genericDbError))
	}
})

module.exports = router

