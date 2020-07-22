'use strict'
const express = require('express')
const router = express.Router()
const { dbError, genericDbError, empty,
	getPlansSuperPath, getPlansSuperSql
} = require('../resources')
const { getPlans } = require('../dbmethods')

router.get(getPlansSuperPath, async (req, res) => {
	try {
		const result = await getPlans(getPlansSuperSql,
			req.query.user_id, req.query.page)
		res.status(200).send(result[0] ? result : empty)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(dbError(genericDbError))
	}
})

module.exports = router
