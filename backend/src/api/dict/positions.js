const express = require('express')
const router = express.Router()
const { db_error, generic_db_error, empty,
	get_dict_positions_sql, get_dict_positions_path
} = require('../../misc/resources')
const { get_dict } = require('../../misc/dbconnector')

router.get(get_dict_positions_path, async (req, res) => {
	try {
		const result = await get_dict(get_dict_positions_sql)
		res.status(200).send(result[0] ? result : empty)
	} catch (ex) {
		res.status(500).send(db_error(generic_db_error))
	}
})

module.exports = router

