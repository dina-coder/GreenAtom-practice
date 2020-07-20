'use strict'
const express = require('express')
const router = express.Router()
const { db_error, generic_db_error,
	updated, update_plan_path
} = require('../../misc/resources')
const { update_plan } = require('../../misc/dbconnector')

router.put(update_plan_path, async (req, res) => {
	try {
		const result = await update_plan(req.body)
		res.status(200).send(updated)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(db_error(generic_db_error))
	}
})

module.exports = router

