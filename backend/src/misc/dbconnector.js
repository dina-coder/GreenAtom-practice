'use strict'
const pool = require('../config/dbconfig')

const { loginSql, getUserNameSql,
	getTasksSql, entriesOnPage } = require('./resources')

const methods = {
	login: async (email, password) => {
		const [rows] = await pool.query(loginSql, [email, password])
		return rows[0]
	},
	getTasks: async plan_id => {
		const [rows] = await pool.query(getTasksSql, [plan_id])
		return rows
	},
	getPlans: async (sql, user_id, page) => {
		let obj = []
		if (user_id)
			obj.push(user_id)
		if (page) {
			obj.push(page * entriesOnPage - entriesOnPage + 1)
			obj.push(entriesOnPage)
		}
		let [rows] = await pool.query(sql, obj)
		if (!rows[0] || !rows[0].hr_id || !rows[0].super_id)
			return []
		await Promise.all(rows.map(async element => {
			let [hrRows] = await pool.query(getUserNameSql, [element.hr_id])
			let [superRows] = await pool.query(getUserNameSql, [element.super_id])
			element.hr = hrRows[0].name
			element.super = superRows[0].name
			return element
		}))
		return rows
	},
	getDict: async (sql, role_id) => {
		const [rows] = await pool.query(sql, role_id ? [role_id] : undefined)
		return rows
	},
	insertPlan: async data => {
		await pool.query(insert_plan_sql, [
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
	},
	insertTask: async data => {
		await pool.query(insert_task_sql,
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
		await pool.query(update_plan_sql,
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
		await pool.query(update_task_sql,
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
	deletePlan: async id => {
		await pool.query(delete_plan_sql, [id])
	},
	deleteTask: async id => {
		await pool.query(delete_task_sql, [id])
	}
}

module.exports = methods
