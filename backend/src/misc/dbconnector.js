const connector = require('../config/dbconfig')
const { login_sql, get_worker_data_sql,
	get_user_name_sql, get_tasks_sql,
	get_plans_super_sql, get_plans_hr_sql,
	get_dict_grades_sql, get_dict_names_sql,
	get_dict_steps_sql, get_dict_positions_sql,
	insert_plan_sql, insert_task_sql,
	update_plan_sql, update_task_sql,
	delete_plan_sql, delete_task_sql } = require('./resources')

	const methods = {
	login: (email, password, callback) => {
		connector.query(login_sql,
		[email, password],
		(err, result) => {
			if (err)
				return callback(err)
			return callback(null, result[0])
		})
	},
	get_worker_data: (user_id, callback) => {
		connector.query(get_worker_data_sql,
		[user_id],
		(err, result) => {
			if (err)
				return callback(err)
			return callback(null, result)
		})
	},
	get_user_name: (user_id, callback) => {
		connector.query(get_user_name_sql,
		[user_id],
		(err, result) => {
			if (err)
				return callback(err)
			return callback(null, result[0])
		})
	},
	get_tasks: (plan_id, callback) => {
		connector.query(get_tasks_sql,
		[plan_id],
		(err, result) => {
			if (err)
				return callback(err)
			return callback(null, result)
		})
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
		let x = connector.query(insert_plan_sql,
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
	}
}

module.exports = methods
