'use strict'
const express = require('express')
const router = express.Router()
const { dbError, genericDbError, deleted,
	deletePlanPath
} = require('../../misc/resources')
const { deletePlan } = require('../../misc/dbconnector')

router.delete(deletePlanPath, async (req, res) => {
	try {
		await deletePlan(req.body.id)
		res.status(200).send(deleted)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(dbError(genericDbError))
	}
})

module.exports = router

