'use strict'
const express = require('express')
const router = express.Router()
const { dbError, genericDbError, empty,
	getPlansSuperPath,
	dynamicComparator
} = require('../resources')
const { getPlansAllSuper } = require('../dbmethods')

router.get(getPlansSuperPath, async (req, res) => {
	try {
		const result = await getPlansAllSuper(req.query.user_id)
		if (req.query.sort)
			await result.sort(dynamicComparator(req.query.sort))
		res.status(200).send(result[0] ? result.slice((req.query.page - 1) * 5, req.query.page * 5) : empty)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(dbError(genericDbError))
	}
})

module.exports = router
