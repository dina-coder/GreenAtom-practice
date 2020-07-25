'use strict'
const express = require('express')
const router = express.Router()
const { dbError, genericDbError, empty,
	getPlansHrFilteredPath,
	invalidTokenError, dateReverse
} = require('../resources')
const { getPlansAll } = require('../dbmethods')

const filter = async (input, tokens, req) => {
	let result = []
	for (let index in input) {
		if (tokens.includes('name')) {
			console.log("1:" + input[index].name)
			const cmpName = -1 === String(input[index].name).toLowerCase().indexOf(String(req.query.name_filter).toLowerCase())
			console.log(cmpName)
			const cmpSuper = -1 === String(input[index].super).toLowerCase().indexOf(String(req.query.name_filter).toLowerCase())
			console.log(cmpSuper)
			console.log(cmpSuper && cmpName)
			if (cmpSuper && cmpName)
				continue
		}
		if (tokens.includes('date')) {
			const cmpStart = (-1 == String(dateReverse(input[index].date_start)).localeCompare(dateReverse(req.query.sdate_filter)))
			const cmpEnd = (1 == String(dateReverse(input[index].date_end)).localeCompare(dateReverse(req.query.edate_filter)))
			console.log(cmpStart)
			console.log(cmpEnd)
			if (cmpStart || cmpEnd)
				continue
		}
		if (tokens.includes('step')) {
			if (req.query.step_filter != input[index].step_id)
				continue
		}
		result.push(input[index])
	}
	console.log("reached end")
	return result
}

router.get(getPlansHrFilteredPath, async (req, res) => {
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
		const result = await getPlansAll()

		const filteredResult = await filter(result, tokens, req)
		if (filteredResult[0]) {
			const size = filteredResult.length
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
