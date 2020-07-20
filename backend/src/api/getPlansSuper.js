'use strict'
const express = require('express')
const router = express.Router()
const { db_error, generic_db_error, empty,
	get_plans_super_path, get_plans_super_sql
} = require('../misc/resources')
const { get_plans } = require('../misc/dbconnector')

router.get(get_plans_super_path, async (req, res) => {
	try {
		const result = await get_plans(get_plans_super_sql,
			req.query.user_id, req.query.page)
		res.status(200).send(result[0] ? result : empty)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(db_error(generic_db_error))
	}
})

module.exports = router
