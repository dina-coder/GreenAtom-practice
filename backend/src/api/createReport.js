'use strict'
const express = require('express')
const pdf = require('html-pdf');
const shortid = require('shortid')
const router = express.Router()
const { dbError, createPdfPath, created,
	getPlansWorkerSql, passed, notPassed,
	pdfCreationError, noPlanError
} = require('../resources')

const { getPlans } = require('../dbmethods')
const htmlTemplate = require('../template')

router.post(createPdfPath, async (req, res) => {
	try {
		const result = await getPlans(getPlansWorkerSql, req.body.user_id)
		if (!result[0]) {
			res.status(500).send(dbError(noPlanError))
			return
		}
		result[0].result = result[0].result ? passed : notPassed
		const filename = shortid.generate() + '.pdf'
		pdf.create(htmlTemplate(result[0]), {}).toFile('src/public/tmp/' + filename, (err) => {
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
