const con = require('./config/dbconfig')

const methods = {
	// Возвращает id роли (role_id) и id пользователя (user_id) внутри объекта, если имя и пароль правильные, undefined в противном случае; err != NULL при ошибке связи с бд
	// role_id:
	// 1 - hr
	// 2 - руководитель
	// 3 - сотрудник
	get_user: async (email, password, callback) => {
		await con.query(`select name, id as user_id, role_id from users where email = ? and password = ?`,
		[email, password],
		async (err, result) => {
			if (err)
				return await callback(err)
			else
			{
				console.log(result)
				return await callback(null, result[0])
			}
		})
	},
	get_worker_data: (user_id, callback) => {
		con.query(`select plans.id, users.name as name, worker_id, positions.name as position, date_creation, super_id, hr_id, steps.name as step, date_start, date_end, result, comment, grades.name as grade from users left join plans on plans.worker_id = users.id left join grades on grades.id = plans.grade_id left join positions on positions.id = plans.position_id left join steps on steps.id = plans.step_id where users.id = ?`,
		[user_id],
		async (err, result) => {
			if (err)
				return await callback(err)
			else
				return await callback(null, result)
		})
	},
	get_user_name: (user_id, callback) => {
		con.query(`select name from users where id = ?`,
		[user_id],
		async (err, result) => {
			if (err)
				return await callback(err)
			else
				return await callback(null, result[0])
		})
	},
	get_tasks: (plan_id, callback) => {
		con.query(`select id, name, date_creation, content, date_start, date_end, result from tasks where plan_id = ?`,
		[plan_id],
		async (err, result) => {
			if (err)
				return await callback(err)
			else
				return await callback(null, result)
		})
	},
	get_plans_super: async (user_id, callback) => {
		await con.query(`select plans.id, users.name as name, positions.id as position_id, positions.name as position, grades.name as grade,  worker_id, date_creation, super_id, hr_id, step_id, steps.name as step, date_start, date_end, result, grade_id, comment  from plans left join users on users.id=plans.worker_id left join grades on grades.id = plans.grade_id left join positions on positions.id = plans.position_id left join steps on steps.id = plans.step_id where super_id = ?`,
		[user_id],
		async (err, result) => {
			if (err)
				return await callback(err)
			else
				return await callback(null, result)
		})
	},
	get_plans_hr: async (callback) => {
		await con.query(`select plans.id, users.name as name, positions.id as position_id, positions.name as position, grades.name as grade,  worker_id, date_creation, super_id, hr_id, step_id, steps.name as step, date_start, date_end, result, grade_id, comment  from plans left join users on users.id=plans.worker_id left join grades on grades.id = plans.grade_id left join positions on positions.id = plans.position_id left join steps on steps.id = plans.step_id`,
		async (err, result) => {
			if (err)
				return await callback(err)
			else
				return await callback(null, result)
		})
	},
	get_dict_grades: (callback) => {
		con.query(`select id, name from grades`,
		(err, result) => {
			if (err)
				return callback(err)
			else
				return callback(null, result)
		})
	},
	get_dict_names: (role_id, callback) => {
		con.query(`select id, name from users where role_id = ?`,
		[role_id],
		async (err, result) => {
			if (err)
				return await callback(err)
			else
				return await callback(null, result)
		})
	},
	get_dict_steps: (callback) => {
		con.query(`select id, name from steps`,
		async (err, result) => {
			if (err)
				return await callback(err)
			else
				return await callback(null, result)
		})
	},
	get_dict_positions: (callback) => {
		con.query(`select id, name from positions`,
		async (err, result) => {
			if (err)
				return await callback(err)
			else
				return await callback(null, result)
		})
	},
	insert_plan: (data, callback) => {
		con.query(`insert into plans (worker_id,position_id,date_creation,super_id,hr_id,step_id,date_start,date_end,result,grade_id,comment) values (?,?,?,?,?,?,?,?,?,?,?)`,
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
			data.comment
		],
		async (err, result) => {
			if (err)
				return await callback(err)
			return await callback(null, result)
		})
		console.log(typeof(x))
	},
	insert_task: (data, callback) => {
		con.query(`insert into tasks (plan_id,name,date_creation,content,date_start,date_end,result) values (?,?,?,?,?,?,?)`,
		[
			data.plan_id,
			data.name,
			data.date_creation,
			data.content,
			data.date_start,
			data.date_end,
			data.result
		],
		async (err, result) => {
			if (err)
				return await callback(err)
			return await callback(null, result)
		})
		console.log(typeof(x))
	},
	update_plan: (data, callback) => {
		con.query(`update plans set worker_id = ?, position_id = ?, date_creation = ?, super_id = ?, hr_id = ?, step_id = ?, date_start = ?, date_end = ?, result = ?, grade_id = ?, comment = ? where id = ?`,
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
		async (err, result) => {
			if (err)
				return await callback(err)
			return await callback(null, result)
		})
	},
	update_task: (data, callback) => {
		con.query(`update tasks set plan_id = ?, name = ?, date_creation = ?, content = ?, date_start = ?, date_end = ?, result = ? where id = ?`,
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
		async (err, result) => {
			if (err)
				return await callback(err)
			return await callback(null, result)
		})
	}
}

module.exports = methods
