'use strict'
const pool = require('./config/dbconfig')

const { loginSql,
	getTasksSql, updateTaskResultSql,
	insertTaskSql, insertPlanSql,
	updatePlanSql, updateTaskSql,
	deletePlanSql, deleteTaskSql,
	plansOnPage, tasksOnPage,
	countTasksSql, getPlansAllSql,
	countPlansSql, countPlansSuperSql,
	getPlansAllSuperSql
} = require('./resources')

const methods = {
	login: async (email, password) => {
		const [rows] = await pool.query(loginSql, [email, password])
		return rows[0][0]
	},
	getTasks: async (plan_id, page) => {
		const [rows] = await pool.query(getTasksSql,
			[
				plan_id,
				page * tasksOnPage - tasksOnPage,
				tasksOnPage
			])
		return rows[0]
	},
	countTasks: async (plan_id) => {
		const [rows] = await pool.query(countTasksSql, [plan_id])
		return rows[0][0]
	},
	countPlans: async (super_id) => {
		const [rows] = await pool.query(
			super_id ? countPlansSuperSql : countPlansSql,
			super_id ? [super_id] : undefined)
		return rows[0][0]
	},
	getPlans: async (sql, user_id, page) => {
		let obj = []
		if (user_id)
			obj.push(user_id)
		if (page) {
			obj.push(page * plansOnPage - plansOnPage)
			obj.push(plansOnPage)
		}
		let [rows] = await pool.query(sql, obj)
		rows = rows[0]
		if (!rows[0])
			return []
		return rows
	},
	getPlansAll: async () => {
		let [rows] = await pool.query(getPlansAllSql)
		rows = rows[0]
		if (!rows[0])
			return []
		return rows
	},
	getPlansAllSuper: async id => {
		let [rows] = await pool.query(getPlansAllSuperSql, [id])
		rows = rows[0]
		if (!rows[0])
			return []
		return rows
	},
	getDict: async (sql, role_id) => {
		const [rows] = await pool.query(sql, role_id ? [role_id] : undefined)
		return rows[0]
	},
	insertPlan: async data => {
		await pool.query(insertPlanSql, [
			data.worker_id,
			data.position_id,
			data.super_id,
			data.hr_id,
			data.date_start,
			data.date_end,
			data.result,
			data.grade_id,
			1,
			1
		])
	},
	insertTask: async data => {
		await pool.query(insertTaskSql,
		[
			data.plan_id,
			data.name,
			data.content,
			data.date_start,
			data.date_end,
			data.result
		])
	},
	updatePlan: async data => {
		await pool.query(updatePlanSql,
		[
			data.worker_id,
			data.position_id,
			data.super_id,
			data.hr_id,
			data.step_id,
			data.date_start,
			data.date_end,
			data.result,
			data.grade_id,
			data.id
		])
	},
	updateTask: async data => {
		await pool.query(updateTaskSql,
		[
			data.plan_id,
			data.name,
			data.content,
			data.date_start,
			data.date_end,
			data.result,
			data.id
		])
	},
	updateTaskResult: async data => {
		await pool.query(updateTaskResultSql,
		[
			data.result,
			data.id
		])
	},
	deletePlan: async id => {
		await pool.query(deletePlanSql, [id])
	},
	deleteTask: async id => {
		await pool.query(deleteTaskSql, [id])
	}
}

module.exports = methods
