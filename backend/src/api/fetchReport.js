'use strict'
const express = require('express')
const path = require('path')
const router = express.Router()
const fs = require('fs')
const util = require('util')
const unlink = util.promisify(fs.unlink)

const { dbError,
	fileDoesNotExistError,
	fetchReportPath
} = require('../resources')

router.get(fetchReportPath, async (req, res) => {
	try {
		await res.status(200).sendFile(
			path.resolve(`${__dirname}/../public/tmp/${req.query.name}`))
		await unlink(`${__dirname}/../public/tmp/${req.query.name}`)

	} catch (ex) {
		res.status(500).send(dbError(fileDoesNotExistError))
	}
})

module.exports = router
