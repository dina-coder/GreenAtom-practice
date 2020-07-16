const con = require('./config/dbconfig')

con.query(`insert into plans(worker_id, position_id, date_creation, super_id, hr_id, step_id, date_start, date_end, result, grade_id, comment) values(?, 1, ?, 3, 1, 1, ?, ?, 0, 3, "none")`),
[5, Date.now(), Date.now(), Date.now()],
async (err, result) => {
	if (err)
		 throw err
	else
		console.log(result)
}
