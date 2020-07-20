'use strict'
const express = require('express')
const router = express.Router()
const { dbError, genericDbError: genericDbError,
	inserted, insertPlanPath
} = require('../../misc/resources')
const { insertPlan } = require('../../misc/dbconnector')

router.post(insertPlanPath, async (req, res) => {
	try {
		const result = await insertPlan(req.body)
		res.status(200).send(inserted)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(dbError(genericDbError))
	}
})

module.exports = router

