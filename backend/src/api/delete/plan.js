'use strict'
const express = require('express')
const router = express.Router()
const { db_error, generic_db_error, deleted,
	delete_plan_path
} = require('../../misc/resources')
const { delete_plan } = require('../../misc/dbconnector')

router.delete(delete_plan_path, async (req, res) => {
	try {
		const result = await delete_plan(req.body.id)
		res.status(200).send(deleted)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(db_error(generic_db_error))
	}
})

module.exports = router

