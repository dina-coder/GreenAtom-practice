'use strict'
const resources = {
	genericDbError: 'Ошибка подключения к базе данных',
	invalidTokenError: 'Невозможно разобрать выражение фильтра',
	extraPlanError: 'Сотрудник уже имеет план адаптации',
	noPlanError: 'Сотрудник не имеет план адаптации',
	fileDoesNotExistError: 'Файл не существует',
	pdfCreationError: 'Невозможно создать отчет',
	dbError: msg => { return {error_message: msg, error_flag: true} },
	serverRunning: port => `Сервер запущен по адресу: http://localhost:${port}`,
	passedPlan: 'Программа испытательного срока пройдена',
	notPassedPlan: 'Программа испытательного срока не пройдена',
	passedTask: 'Выполнена',
	notPassedTask: 'Не выполнена',
	morganString: ':method :url :status :res[content-length] - :response-time ms',
	frontendOrigin: 'http://localhost:3000',
	plansOnPage: 5,
	tasksOnPage: 5,
	commentsOnPage: 5,
	notificationsOnPage: 5,
	defaultExpressPort: 9000,

	inserted: {inserted: true},
	updated: {updated: true},
	deleted: {deleted: true},
	empty: {empty: true},
	created: filename => { return {created: true, name: filename} },

	loginSql: 'call sp_login(?, ?)',
	getPlansWorkerSql: 'call sp_get_plans_worker(?)',
	getTasksSql: 'call sp_get_tasks(?, ?, ?)',
	getPlansSuperSql: 'call sp_get_plans_super(?, ?, ?)',
	getPlansHrSql: 'call sp_get_plans_hr(?, ?)',
	getDictGradesSql: 'call sp_get_dict_grades()',
	getDictNamesSql: 'call sp_get_dict_names(?)',
	getDictStepsSql: 'call sp_get_dict_steps()',
	getDictPositionsSql: 'call sp_get_dict_positions()',
	insertPlanSql: 'insert into plans (worker_id, position_id, date_creation, \
	super_id, hr_id, step_id, date_start, date_end, result, grade_id, is_notified_worker, is_notified_super) \
	values (?, ?, curdate(), ?, ?, 1, ?, ?, ?, ?, ?, ?)',
	insertTaskSql: 'call sp_insert_task(?, ?, ?, ?, ?, ?)',
	updatePlanSql: 'call sp_update_plan(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
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
	left join roles on users.role_id = roles.id where plan_id = ? \
	order by id desc limit ?, ?',
	insertCommentSql: 'insert into comments(plan_id, date_creation, user_id, content) values(?, now(), ?, ?)',
	updateCommentSql: 'update comments set content = ? where plan_id = ?',
	deleteCommentSql: 'delete from comments where id = ?',
	deleteAllCommentsSql: 'delete from comments where plan_id = ?',
	countCommentsSql: 'select count(*) as count from comments where plan_id = ?',
	notifySuperSql: 'update plans set is_notified_super = 0 where id = ?',
	notifyWorkerSql: 'update plans set is_notified_worker = 0 where id = ?',
	resetNotifySuperSql: 'update plans set is_notified_super = 1 where id = ?',
	resetNotifyWorkerSql: 'update plans set is_notified_worker = 1 where id = ?',
	getStepIdSql: 'select step_id from plans where id = ?',
	getPlanIdSql: 'select id from plans where worker_id = ?',
	getPlansAllSuperLimitedSql: 'select plans.id as id, steps.name as step, users.name as name \
	from plans left join users on users.id = plans.worker_id left join steps on \
	steps.id = plans.step_id where is_notified_super = 0 and super_id = ?',
	getTasksAllSql: 'select id, name, result, DATE_FORMAT(date_creation, "%d.%m.%Y") as date_creation, \
	DATE_FORMAT(date_start, "%d.%m.%Y") as date_start, \
	DATE_FORMAT(date_end, "%d.%m.%Y") as date_end, \
	content from tasks where plan_id = ?',
	getWorkerNotificationSql: 'select plans.id, steps.name as step, susers.name as super \
	from plans \
	left join users as susers on susers.id = plans.super_id \
	left join users as wusers on wusers.id = plans.worker_id \
	left join steps on steps.id = plans.step_id \
	where wusers.id = ? and is_notified_worker = 0',

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
	createPdfPath: '/create_report',
	fetchReportPath: '/fetch_report',
	getSuperNotificationsPath: '/get_super_notifications',
	getWorkerNotificationPath: '/get_worker_notifications',

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
