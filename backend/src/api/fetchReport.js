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
		const stream = fs.createReadStream(path.resolve(`${__dirname}/../public/tmp/${req.query.name}`))
		stream.pipe(res).once('close', () => {
			stream.destroy()
		})
		await unlink(path.resolve(`${__dirname}/../public/tmp/${req.query.name}`))

	} catch (ex) {
		res.status(500).send(dbError(fileDoesNotExistError))
	}
})

module.exports = router
