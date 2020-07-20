const express = require('express')
const router = express.Router()
const { dbError, genericDbError, empty,
	getPlansWorkerPath, getPlansWorkerSql
} = require('../misc/resources')
const { getPlans } = require('../misc/dbconnector')

router.get(getPlansWorkerPath, async (req, res) => {
	try {
		const result = await getPlans(getPlansWorkerSql, req.query.user_id)
		res.status(200).send(result[0] ? result : empty)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(dbError(genericDbError))
	}
})

module.exports = router
