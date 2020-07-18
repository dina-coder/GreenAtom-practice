'use strict'
const resources = {
	generic_db_error: "Ошибка подключения к базе данных",
	db_error: msg => { return {error_message: msg, error_flag: true} },
	server_running: port => { return `Сервер запущен по адресу: http://localhost:${port}`},
	frontend_origin: 'http://localhost:3000',
	inserted: {inserted: true},
	updated: {updated: true},
	deleted: {deleted: true},
	empty: {empty: true},
	default_express_port: 9000,
	login_sql: 'select name, id as user_id, role_id from users where email = ? and password = ?',
	get_worker_data_sql: 'select plans.id as plan_id, users.name as name, worker_id, positions.name as position, date_creation, super_id, hr_id, steps.name as step, date_start, date_end, result, comment, grades.name as grade from users left join plans on plans.worker_id = users.id left join grades on grades.id = plans.grade_id left join positions on positions.id = plans.position_id left join steps on steps.id = plans.step_id where users.id = ?',
	get_user_name_sql: 'select name from users where id = ?',
	get_tasks_sql: 'select id, name, date_creation, content, date_start, date_end, result from tasks where plan_id = ?',
	get_plans_super_sql: 'select plans.id, users.name as name, positions.id as position_id, positions.name as position, grades.name as grade,  worker_id, date_creation, super_id, hr_id, step_id, steps.name as step, date_start, date_end, result, grade_id, comment  from plans left join users on users.id=plans.worker_id left join grades on grades.id = plans.grade_id left join positions on positions.id = plans.position_id left join steps on steps.id = plans.step_id where super_id = ?',
	get_plans_hr_sql: 'select plans.id, users.name as name, positions.id as position_id, positions.name as position, grades.name as grade,  worker_id, date_creation, super_id, hr_id, step_id, steps.name as step, date_start, date_end, result, grade_id, comment  from plans left join users on users.id=plans.worker_id left join grades on grades.id = plans.grade_id left join positions on positions.id = plans.position_id left join steps on steps.id = plans.step_id',
	get_dict_grades_sql: 'select id, name from grades',
	get_dict_names_sql: 'select id, name from users where role_id = ?',
	get_dict_steps_sql: 'select id, name from steps',
	get_dict_positions_sql: 'select id, name from positions',
	insert_plan_sql: 'insert into plans (worker_id,position_id,date_creation,super_id,hr_id,step_id,date_start,date_end,result,grade_id,comment) values (?,?,?,?,?,?,?,?,?,?,?)',
	insert_task_sql: 'insert into tasks (plan_id,name,date_creation,content,date_start,date_end,result) values (?,?,?,?,?,?,?)',
	update_plan_sql: 'update plans set worker_id = ?, position_id = ?, date_creation = ?, super_id = ?, hr_id = ?, step_id = ?, date_start = ?, date_end = ?, result = ?, grade_id = ?, comment = ? where id = ?',
	update_task_sql: 'update tasks set plan_id = ?, name = ?, date_creation = ?, content = ?, date_start = ?, date_end = ?, result = ? where id = ?',
	delete_plan_sql: 'delete from plans where id = ?',
	delete_task_sql: 'delete from tasks where id = ?'
}

module.exports = resources
