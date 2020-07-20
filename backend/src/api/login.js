'use strict'
const express = require('express')
const router = express.Router()
const sha1 = require('sha1')
const { dbError, genericDbError, empty,
	loginPath
} = require('../misc/resources')
const { login } = require('../misc/dbconnector')

router.post(loginPath, async (req, res) => {
	try {
		const result = await login(req.body.email,
			sha1(req.body.email + req.body.password))
		res.status(200).send(result ? result : empty)
	} catch (ex) {
		console.error(ex)
		res.status(500).send(dbError(genericDbError))
	}
})

module.exports = router
