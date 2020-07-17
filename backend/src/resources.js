const resources = {
	db_error: 'Невозможно подключиться к БД',
	server_running: port => { return `Сервер запущен по адресу: http://localhost:${port}`},
	frontend_origin: 'http://localhost:3000'
}

module.exports = resources
