'use strict'
const express = require('express')
const router = express.Router()
const { db_error, generic_db_error,
	inserted, insert_plan_path
} = require('../../misc/resources')
const { insert_plan } = require('../../misc/dbconnector')

router.post(insert_plan_path, async (req, res) => {
	try {
		const result = await insert_plan(req.body)
		res.status(200).send(inserted)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(db_error(generic_db_error))
	}
})

module.exports = router

