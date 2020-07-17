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
		connector.query(`select name, id as user_id, role_id from users where email = ? and password = ?`,
		[email, password],
		(err, result) => {
			if (err)
				return callback(err)
			return callback(null, result[0])
		})
	},
	get_worker_data: (user_id, callback) => {
		connector.query(`select plans.id as plan_id, users.name as name, worker_id, positions.name as position, date_creation, super_id, hr_id, steps.name as step, date_start, date_end, result, comment, grades.name as grade from users left join plans on plans.worker_id = users.id left join grades on grades.id = plans.grade_id left join positions on positions.id = plans.position_id left join steps on steps.id = plans.step_id where users.id = ?`,
		[user_id],
		(err, result) => {
			if (err)
				return callback(err)
			return callback(null, result)
		})
	},
	get_user_name: (user_id, callback) => {
		connector.query(`select name from users where id = ?`,
		[user_id],
		(err, result) => {
			if (err)
				return callback(err)
			return callback(null, result[0])
		})
	},
	get_tasks: (plan_id, callback) => {
		connector.query(`select id, name, date_creation, content, date_start, date_end, result from tasks where plan_id = ?`,
		[plan_id],
		(err, result) => {
			if (err)
				return callback(err)
			return callback(null, result)
		})
	},
	get_plans_super: (user_id, callback) => {
		connector.query(`select users.name as name, positions.id as position_id, positions.name as position, grades.name as grade,  worker_id, date_creation, super_id, hr_id, step_id, steps.name as step, date_start, date_end, result, grade_id, comment  from plans left join users on users.id=plans.worker_id left join grades on grades.id = plans.grade_id left join positions on positions.id = plans.position_id left join steps on steps.id = plans.step_id where super_id = ?`,
		[user_id],
		(err, result) => {
			if (err)
				return callback(err)
			return callback(null, result)
		})
	},
	get_plans_hr: (callback) => {
		connector.query(`select users.name as name, positions.id as position_id, positions.name as position, grades.name as grade,  worker_id, date_creation, super_id, hr_id, step_id, steps.name as step, date_start, date_end, result, grade_id, comment  from plans left join users on users.id=plans.worker_id left join grades on grades.id = plans.grade_id left join positions on positions.id = plans.position_id left join steps on steps.id = plans.step_id`,
		(err, result) => {
			if (err)
				return callback(err)
			return callback(null, result)
		})
	},
	get_dict_grades: (callback) => {
		connector.query(`select id, name from grades`,
		(err, result) => {
			if (err)
				return callback(err)
			return callback(null, result)
		})
	},
	get_dict_names: (role_id, callback) => {
		connector.query(`select id, name from users where role_id = ?`,
		[role_id],
		(err, result) => {
			if (err)
				return callback(err)
			return callback(null, result)
		})
	},
	get_dict_steps: (callback) => {
		connector.query(`select id, name from steps`,
		(err, result) => {
			if (err)
				return callback(err)
			return callback(null, result)
		})
	},
	get_dict_positions: (callback) => {
		connector.query(`select id, name from positions`,
		(err, result) => {
			if (err)
				return callback(err)
			return callback(null, result)
		})
	},
	insert_plan: (data, callback) => {
		let x = connector.query(`insert into plans (worker_id,position_id,date_creation,super_id,hr_id,step_id,date_start,date_end,result,grade_id,comment) values (?,?,?,?,?,?,?,?,?,?,?)`,
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
		console.log(typeof(x))
	}
}

module.exports = methods
