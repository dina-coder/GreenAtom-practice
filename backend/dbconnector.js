const con = require('./config/dbconfig')

const get_user_name = (user_id) => {
	con.query(`select name from users where id = ?`,
	[user_id],
	async (err, result) => {
		if (err)
			return await callback(err)
		else
			return await callback(null, result[0])
	})
}

const get_tasks = (user_id) => {

}

module.exports = {
	// Возвращает id роли (role_id) и id пользователя (user_id) внутри объекта, если имя и пароль правильные, undefined в противном случае; err != NULL при ошибке связи с бд
	// role_id:
	// 1 - hr
	// 2 - руководитель
	// 3 - сотрудник
	get_user: async (email, password, callback) => {
		await con.query(`select id as user_id, role_id from users where email = ? and password = ?`,
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
		con.query(`select worker_id, positions.name as position, date_creation, super_id, hr_id, steps.name as step, date_start, date_end, result, comment, grades.name as grade from users left join plans on plans.worker_id = users.id left join grades on grades.id = plans.grade_id left join positions on positions.id = plans.position_id left join steps on steps.id = plans.step_id where users.id = ?`,
		[user_id],
		async (err, result) => {
			if (err)
				return callback(err)
			else
				result.hr = await get_user_name(result.hr_id)
				//result.super = await get_user_name(result.super_id)
				//result.tasks = await get_tasks(result.worker_id)
				return await callback(null, result)
		});
	}
}
