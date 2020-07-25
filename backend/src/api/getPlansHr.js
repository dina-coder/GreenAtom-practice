'use strict'
const express = require('express')
const router = express.Router()
const { dbError, genericDbError, empty,
	getPlansHrPath, dynamicComparator
} = require('../resources')
const { getPlansAll } = require('../dbmethods')

router.get(getPlansHrPath, async (req, res) => {
	try {
		const result = await getPlansAll()
		if (req.query.sort)
			await result.sort(dynamicComparator(req.query.sort))
		res.status(200).send(result[0] ? result.slice((req.query.page - 1) * 5, req.query.page * 5) : empty)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(dbError(genericDbError))
	}
})

module.exports = router
