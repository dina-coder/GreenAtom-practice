'use strict'
const express = require('express')
const router = express.Router()
const { dbError, genericDbError, empty,
	getDictPositionsSql, getDictPositionsPath
} = require('../../resources')
const { getDict } = require('../../dbmethods')

router.get(getDictPositionsPath, async (req, res) => {
	try {
		const result = await getDict(getDictPositionsSql)
		res.status(200).send(result[0] ? result : empty)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(dbError(genericDbError))
	}
})

module.exports = router

