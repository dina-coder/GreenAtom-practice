// Файл показывает примеры использования функций из dbconnector.js
// TODO удалить его ASAP (=

const { get_user, get_position } = require('./dbconnector')
const hashing = require('./hashing')

// Получение существующего пользовател - возвращен 1 объект
get_user("hr0@mail.com", hashing("hr0@mail.com", "000"), (err, results) => {
	if (err)
		throw err
	console.log(results)
	console.log(results.user_id) // Получение id пользователя
	console.log(results.role_id) // Получение id роли
	console.log(results.name) // Получение ФИО
})

// Получение несуществующего пользователя - возвращен undefined
get_user("hr0@mail.com", hashing("hr0@mail.com", "0"), (err, results) => {
	if (err)
		throw err
	console.log(results)
})

//Получение должности
get_position(5, (err, results) => {
	//if (err)
	//	throw err
	console.log(results)
})
