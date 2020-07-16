const con = require('./config/dbconfig')
const append0 = entity => {
	return entity.length < 2 ? "0" + entity : entity
}

const date = new Date()
const newdate = date.getFullYear() + "-" + append0(date.getMonth().toString()) + "-" + append0(date.getDay().toString())
//const date = new Date('10/09/2019')
console.log(newdate)
con.query(`insert into plans (worker_id, position_id, date_creation, super_id, hr_id, step_id, date_start, date_end, result, grade_id, comment) values (5, 1, '` + newdate + `' , 3, 1, 1, '` + newdate + `', '` + newdate + `', 0, 3, 'none')`),
	(err, result) => {
	if (err)
		 throw err
	else
		console.log(result)

}

con.query(`show databases`),
	(err, result) => {
	if (err)
		 throw err
	else
		console.log(result)

}


con.query(`select * from plans`),
	(err, result) => {
	if (err)
		 throw err
	else
		console.log(result)

}
