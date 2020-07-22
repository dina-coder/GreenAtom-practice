'use strict'
const express = require('express')
const router = express.Router()
const { dbError, genericDbError, empty,
	getPlansHrPath, getPlansHrSql
} = require('../resources')
const { getPlans } = require('../dbmethods')

router.get(getPlansHrPath, async (req, res) => {
	try {
		const result = await getPlans(getPlansHrSql, undefined, req.query.page)
		res.status(200).send(result[0] ? result : empty)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(dbError(genericDbError))
	}
})

module.exports = router
