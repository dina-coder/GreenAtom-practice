'use strict'
const express = require('express')
const router = express.Router()
const { dbError, genericDbError,
	updated, updatePlanPath
} = require('../../misc/resources')
const { updatePlan } = require('../../misc/dbconnector')

router.put(updatePlanPath, async (req, res) => {
	try {
		await updatePlan(req.body)
		res.status(200).send(updated)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(dbError(genericDbError))
	}
})

module.exports = router

