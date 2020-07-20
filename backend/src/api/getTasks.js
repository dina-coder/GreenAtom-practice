'use strict'
const express = require('express')
const router = express.Router()
const { db_error, generic_db_error, empty,
	get_tasks_path
} = require('../misc/resources')
const { get_tasks } = require('../misc/dbconnector')

router.get(get_tasks_path, async (req, res) => {
	try {
		const result = await get_tasks(req.query.plan_id)
		res.status(200).send(result[0] ? result : empty)
	} catch (ex) {
		console.log(ex)
		res.status(500).send(db_error(generic_db_error))
	}
})

module.exports = router

