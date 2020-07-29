'use strict'
const express = require('express')
const pdf = require('html-pdf');
const shortid = require('shortid')
const pool = require('../config/dbconfig')
const router = express.Router()
const { dbError, createPdfPath, created,
	getPlansWorkerSql, passed, notPassed,
	pdfCreationError, noPlanError,
	getTasksAllSql
} = require('../resources')

const { getPlans } = require('../dbmethods')
const htmlTemplate = require('../template')

const getTasksAll = async plan_id => {
	const result = await pool.query(getTasksAllSql, plan_id)
	return result[0];
}

router.post(createPdfPath, async (req, res) => {
	try {
		const planResult = await getPlans(getPlansWorkerSql, req.body.user_id)
		if (!planResult[0]) {
			res.status(500).send(dbError(noPlanError))
			return
		}
		const taskResult = await getTasksAll(planResult[0].plan_id)
		await Promise.all(taskResult.map(element => {
			element.result = element.result ? passed : notPassed
		}))
		console.log(taskResult)
		planResult[0].result = planResult[0].result ? passed : notPassed
		const filename = shortid.generate() + '.pdf'
		pdf.create(htmlTemplate(planResult[0], taskResult), {}).toFile('src/public/tmp/' + filename, (err) => {
			if (err) {
				res.status(500).send(dbError(pdfCreationError))
				return
			}
			res.status(200).send(created(filename))
		})
	} catch (ex) {
		console.error(ex)
		res.status(500).send(dbError(pdfCreationError))
	}
})

module.exports = router
