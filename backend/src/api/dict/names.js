'use strict'
const express = require('express')
const router = express.Router()
const { dbError, genericDbError, empty,
	getDictNamesSql, getDictNamesPath
} = require('../../resources')
const { getDict } = require('../../dbmethods')

router.get(getDictNamesPath, async (req, res) => {
	try {
		const result = await getDict(getDictNamesSql, req.query.role_id)
		res.status(200).send(result[0] ? result : empty)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(dbError(genericDbError))
	}
})

module.exports = router

