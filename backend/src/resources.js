'use strict'
const resources = {
	genericDbError: 'Ошибка подключения к базе данных',
	invalidTokenError: 'Невозможно разобрать выражение фильтра',
	extraPlanError: 'Сотрудник уже имеет план адаптации',
	dbError: msg => { return {error_message: msg, error_flag: true} },
	serverRunning: port => `Сервер запущен по адресу: http://localhost:${port}`,
	morganString: ':method :url :status :res[content-length] - :response-time ms',
	frontendOrigin: 'http://localhost:3000',
	plansOnPage: 5,
	tasksOnPage: 5,
	commentsOnPage: 5,
	defaultExpressPort: 9000,

	inserted: {inserted: true},
	updated: {updated: true},
	deleted: {deleted: true},
	empty: {empty: true},

	loginSql: 'call sp_login(?, ?)',
	getPlansWorkerSql: 'call sp_get_plans_worker(?)',
	getTasksSql: 'call sp_get_tasks(?, ?, ?)',
	getPlansSuperSql: 'call sp_get_plans_super(?, ?, ?)',
	getPlansHrSql: 'call sp_get_plans_hr(?, ?)',
	getDictGradesSql: 'call sp_get_dict_grades()',
	getDictNamesSql: 'call sp_get_dict_names(?)',
	getDictStepsSql: 'call sp_get_dict_steps()',
	getDictPositionsSql: 'call sp_get_dict_positions()',
	insertPlanSql: 'call sp_insert_plan(?, ?, ?, ?, ?, ?, ?, ?, ?)',
	insertTaskSql: 'call sp_insert_task(?, ?, ?, ?, ?, ?)',
	updatePlanSql: 'call sp_update_plan(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
	updateTaskSql: 'call sp_update_task(?, ?, ?, ?, ?, ?, ?)',
	updateTaskResultSql: 'call sp_update_task_result(?, ?)',
	deletePlanSql: 'call sp_delete_plan(?)',
	deleteTaskSql: 'call sp_delete_task(?)',
	countTasksSql: 'call sp_count_tasks(?)',
	countPlansSql: 'call sp_count_plans()',
	countPlansSuperSql: 'call sp_count_plans_super(?)',
	getPlansAllSql: 'call sp_get_plans_all()',
	getPlansAllSuperSql: 'call sp_get_plans_all_super(?)',
	getCommentsSql: 'select comments.id, DATE_FORMAT(date_creation, "%d.%m.%Y-%H:%i") as date_creation, \
	user_id, content, users.name as name, roles.name as role from comments left join users on users.id = user_id \
	left join roles on users.role_id = roles.id where plan_id = ? limit ?, ?',
	insertCommentSql: 'insert into comments(plan_id, date_creation, user_id, content) values(?, now(), ?, ?)',
	updateCommentSql: 'update comments set content = ? where plan_id = ?',
	deleteCommentSql: 'delete from comments where id = ?',
	deleteAllCommentsSql: 'delete from comments where plan_id = ?',
	countCommentsSql: 'select count(*) as count from comments where plan_id = ?',

	apiPath: '/api',
	loginPath: '/login',
	getPlansWorkerPath: '/get_worker_data',
	getTasksPath: '/get_tasks',
	getPlansSuperPath: '/get_plans_super',
	getPlansSuperFilteredPath: '/get_plans_super_filtered',
	getPlansHrPath: '/get_plans_hr',
	getPlansHrFilteredPath: '/get_plans_hr_filtered',
	getDictGradesPath: '/dict/grades',
	getDictNamesPath: '/dict/names',
	getDictStepsPath: '/dict/steps',
	getDictPositionsPath: '/dict/positions',
	insertPlanPath: '/insert/plan',
	insertTaskPath: '/insert/task',
	updatePlanPath: '/update/plan',
	updateTaskPath: '/update/task',
	updateTaskResultPath: '/update/task_result',
	deletePlanPath: '/delete/plan',
	deleteTaskPath: '/delete/task',
	countTasksPath: '/count_tasks',
	countPlansPath: '/count_plans',
	getCommentsPath: '/get_comments',
	insertCommentPath: '/insert/comment',
	updateCommentPath: '/update/comment',
	deleteCommentPath: '/delete/comment',
	deleteAllCommentsPath: '/delete/all_comments',
	countCommentsPath: '/count_comments',

	dateConvertToMySql: date => date.split('.').reverse().join('-'),
	dateReverse: date => date.split('.').reverse().join('.'),
	dynamicComparator: (property) => {
		const dateReverse = date =>
			date.split('.').reverse().join('.')
		let multiply = 1
		if (property[0] === '-') {
			property = property.substr(1)
			multiply *= -1
		}
		return property.substr(0, 4) === 'date'
		? (a, b) => {
			return multiply * String(dateReverse(a[property])).localeCompare(dateReverse(b[property]))
		}
		: (a, b) => {
			return multiply * ((a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0)
		}
	},
}

module.exports = resources
