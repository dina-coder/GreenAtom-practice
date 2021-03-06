'use strict'
const express = require('express')
const router = express.Router()
const { dbError, genericDbError, empty,
	getPlansSuperFilteredPath,
	invalidTokenError, dateReverse,
	dynamicComparator
} = require('../resources')
const { getPlansAllSuper } = require('../dbmethods')

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

		const result = await getPlansAllSuper(req.query.user_id)
		const filteredResult = await Promise.all(result.filter(element => {
			if (tokens.includes('name')) {
				if (-1 === String(element.name).toLowerCase().indexOf(String(req.query.name_filter).toLowerCase()))
						return false
			}
			if (tokens.includes('date')) {
				const cmpStart = (-1 == String(dateReverse(element.date_start)).localeCompare(dateReverse(req.query.sdate_filter)))
				const cmpEnd = (1 == String(dateReverse(element.date_end)).localeCompare(dateReverse(req.query.edate_filter)))
				console.log(cmpStart)
				console.log(cmpEnd)
				if (cmpStart || cmpEnd)
					return false

			}
			if (tokens.includes('step')) {
				if (req.query.step_filter != element.step_id)
					return false
			}
			return true
		}))
		if (filteredResult[(req.query.page - 1) * 5]) {
			const size = filteredResult.length
			if (req.query.sort)
				await filteredResult.sort(dynamicComparator(req.query.sort))
			const returnResult = filteredResult.slice((req.query.page - 1) * 5, req.query.page * 5)
			returnResult.unshift(size)
			res.status(200).send(returnResult);
		}
		else
			res.status(200).send(empty)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(dbError(genericDbError))
	}
})

module.exports = router
