'use strict'
const pool = require('../config/dbconfig')

const { loginSql,
	getTasksSql, updateTaskResultSql,
	insertTaskSql, insertPlanSql,
	updatePlanSql, updateTaskSql,
	deletePlanSql, deleteTaskSql,
	entriesOnPage } = require('./resources')

const methods = {
	login: async (email, password) => {
		const [rows] = await pool.query(loginSql, [email, password])
		return rows[0][0]
	},
	getTasks: async (plan_id, page) => {
		const [rows] = await pool.query(getTasksSql,
			[
				plan_id,
				page * entriesOnPage - entriesOnPage,
				entriesOnPage
			])
		return rows[0]
	},
	getPlans: async (sql, user_id, page) => {
		let obj = []
		if (user_id)
			obj.push(user_id)
		if (page) {
			obj.push(page * entriesOnPage - entriesOnPage)
			obj.push(entriesOnPage)
		}
		let [rows] = await pool.query(sql, obj)
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
		const result = await pool.query(insertPlanSql, [
			data.worker_id,
			data.position_id,
			data.super_id,
			data.hr_id,
			data.date_start,
			data.date_end,
			data.result,
			data.grade_id,
			data.comment
		])
		return result[0].affectedRows > 0
	},
	insertTask: async data => {
		const result = await pool.query(insertTaskSql,
		[
			data.plan_id,
			data.name,
			data.content,
			data.date_start,
			data.date_end,
			data.result
		])
		return result[0].affectedRows > 0
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
			data.comment,
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
