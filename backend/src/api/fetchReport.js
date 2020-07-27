'use strict'
const express = require('express')
const path = require('path')
const router = express.Router()
const { dbError,
	fileDoesNotExistError,
	fetchReportPath
} = require('../resources')

router.get(fetchReportPath, (req, res) => {
	try {
		res.status(200).sendFile(path.resolve(`${__dirname}/../public/tmp/${req.query.name}`))
	} catch (ex) {
		res.status(500).send(dbError(fileDoesNotExistError))
	}
})

module.exports = router
