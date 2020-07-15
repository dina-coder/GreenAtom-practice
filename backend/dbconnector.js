const con = require('./config/dbconfig')

module.exports = {
	// Возвращает имя, id роли (role_id) и id пользователя (user_id) внутри объекта, если имя и пароль правильные, undefined в противном случае; err != NULL при ошибке связи с бд
	// role_id:
	// 1 - hr
	// 2 - руководитель
	// 3 - сотрудник
	get_user: (email, password, callback) => {
		con.query(`select name, id as user_id, role_id from users where email = ? and password = ?`,
		[email, password],
		function (err, result) {
			if (err)
				return callback(err)
			else
				return callback(null, result[0])
		});
	},
	// Возвращает должность, undefined при отсутствии
	get_position: (user_id, callback) => {
		con.query(`select positions.name as position from plans left join positions on positions.id = plans.position_id where worker_id = ?`,
		[user_id],
		function (err, result) {
			if (err)
				return callback(err)
			else
				return callback(null, result)
		});
	}
}
