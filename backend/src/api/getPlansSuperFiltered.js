'use strict'
const express = require('express')
const router = express.Router()
const { dbError, genericDbError, empty,
	getPlansSuperFilteredPath, invalidTokenError, dateReverse
} = require('../resources')
const { getPlansLimited } = require('../dbmethods')

router.get(getPlansSuperFilteredPath, async (req, res) => {
	try {
		if (!req.query.filter_by)
			res.status(500).send(dbError(invalidTokenError))
		const tokens = await String(req.query.filter_by).split(',')
		if (tokens.includes('name') && !req.query.name_filter)
			res.status(500).send(dbError(invalidTokenError))
		if (tokens.includes('date') && (!req.query.sdate_filter || !req.query.edate_filter))
			res.status(500).send(dbError(invalidTokenError))
		if (tokens.includes('step') && !req.query.step_filter)
			res.status(500).send(dbError(invalidTokenError))
		const result = await getPlansLimited()
		const filteredResult = await Promise.all(result.filter(element => {
			if (tokens.includes('name')) {
				if (-1 === String(element.wname).toLowerCase().indexOf(String(req.query.name_filter).toLowerCase()))
					{
						console.log("FALSE")
						return false
					}
			}
			if (tokens.includes('date')) {
				if (1 === String(dateReverse(req.query.sdate_filter)).localeCompare(String(element.date_start)) ||
				-1 === String(dateReverse(req.query.edate_filter)).localeCompare(String(element.date_end)))
					return false
			}
			if (tokens.includes('step')) {
				if (req.query.step_filter != element.step_id)
					return false
			}
			return true
		}))

		res.status(200).send(filteredResult[0] ? filteredResult.slice((req.query.page - 1) * 5, req.query.page * 5) : empty)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(dbError(genericDbError))
	}
})

module.exports = router
