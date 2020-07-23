'use strict'
const express = require('express')
const router = express.Router()
const { dbError, genericDbError, empty,
	countPlansPath } = require('../resources')
const { countPlans } = require('../dbmethods')

router.get(countPlansPath, async (req, res) => {
	try {
		const result = await countPlans(req.query.id)
		res.status(200).send(result ? result : empty)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(dbError(genericDbError))
	}
})

module.exports = router

