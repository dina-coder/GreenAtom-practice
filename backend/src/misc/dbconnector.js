const connector = require('../config/dbconfig')
const pool = require('../config/db2config')
const { login_sql, get_worker_data_sql,
	get_user_name_sql, get_tasks_sql,
	get_plans_super_sql, get_plans_hr_sql,
	get_dict_grades_sql, get_dict_names_sql,
	get_dict_steps_sql, get_dict_positions_sql,
	insert_plan_sql, insert_task_sql,
	update_plan_sql, update_task_sql,
	delete_plan_sql, delete_task_sql } = require('./resources')

	const methods = {
	login: async (email, password) => {
		const [rows] = await pool.query(login_sql, [email, password])
		return rows[0]
	},
	get_worker_data: async user_id => {
		const [rows] = await pool.query(get_worker_data_sql, [user_id])
		if (!rows[0])
			return (rows)
		const [hr_rows] = await pool.query(get_user_name_sql, [rows[0].hr_id])
		const [super_rows] = await pool.query(get_user_name_sql, [rows[0].super_id])
		rows[0].hr = hr_rows[0].name
		rows[0].super = super_rows[0].name
		return rows
	},
	get_user_name: async user_id => {
		const [rows] = await pool.query(get_user_name_sql, [user_id])
		return rows[0]
	},
	get_tasks: async plan_id => {
		const [rows] = await pool.query(get_tasks_sql, [plan_id])
		return rows
	},
	get_plans_super: (user_id, callback) => {
		connector.query(get_plans_super_sql,
		[user_id],
		(err, result) => {
			if (err)
				return callback(err)
			return callback(null, result)
		})
	},
	get_plans_hr: (callback) => {
		connector.query(get_plans_hr_sql,
		(err, result) => {
			if (err)
				return callback(err)
			return callback(null, result)
		})
	},
	get_dict_grades: (callback) => {
		connector.query(get_dict_grades_sql,
		(err, result) => {
			if (err)
				return callback(err)
			return callback(null, result)
		})
	},
	get_dict_names: (role_id, callback) => {
		connector.query(get_dict_names_sql,
		[role_id],
		(err, result) => {
			if (err)
				return callback(err)
			return callback(null, result)
		})
	},
	get_dict_steps: (callback) => {
		connector.query(get_dict_steps_sql,
		(err, result) => {
			if (err)
				return callback(err)
			return callback(null, result)
		})
	},
	get_dict_positions: (callback) => {
		connector.query(get_dict_positions_sql,
		(err, result) => {
			if (err)
				return callback(err)
			return callback(null, result)
		})
	},
	insert_plan: (data, callback) => {
		connector.query(insert_plan_sql,
		[
			data.worker_id,
			data.position_id,
			data.date_creation,
			data.super_id,
			data.hr_id,
			data.step_id,
			data.date_start,
			data.date_end,
			data.result,
			data.grade_id,
			data.comment,
		],
		(err, result) => {
			if (err)
				return callback(err)
			return callback(null, result)
		})
	},
	insert_task: (data, callback) => {
		connector.query(insert_task_sql,
		[
			data.plan_id,
			data.name,
			data.date_creation,
			data.content,
			data.date_start,
			data.date_end,
			data.result
		],
		(err, result) => {
			if (err)
				return callback(err)
			return callback(null, result)
		})
	},
	update_plan: (data, callback) => {
		connector.query(update_plan_sql,
		[
			data.worker_id,
			data.position_id,
			data.date_creation,
			data.super_id,
			data.hr_id,
			data.step_id,
			data.date_start,
			data.date_end,
			data.result,
			data.grade_id,
			data.comment,
			data.id
		],
		(err, result) => {
			if (err)
				return callback(err)
			return callback(null, result)
		})
	},
	update_task: (data, callback) => {
		connector.query(update_task_sql,
		[
			data.plan_id,
			data.name,
			data.date_creation,
			data.content,
			data.date_start,
			data.date_end,
			data.result,
			data.id
		],
		(err, result) => {
			if (err)
				return callback(err)
			return callback(null, result)
		})
	},
	delete_plan: (id, callback) => {
		connector.query(delete_plan_sql,
		[id],
		(err, result) => {
			if (err)
				return callback(err)
			return callback(null, result)
		})
	},
	delete_task: (id, callback) => {
		connector.query(delete_task_sql,
		[id],
		(err, result) => {
			if (err)
				return callback(err)
			return callback(null, result)
		})
	}
}

module.exports = methods
