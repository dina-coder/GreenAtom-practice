'use strict'
const express = require('express')
const router = express.Router()
const { dbError, genericDbError, empty,
	getDictGradesSql, getDictGradesPath
} = require('../../misc/resources')
const { getDict } = require('../../misc/dbconnector')

router.get(getDictGradesPath, async (req, res) => {
	try {
		const result = await getDict(getDictGradesSql)
		res.status(200).send(result[0] ? result : empty)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(dbError(genericDbError))
	}
})

module.exports = router
