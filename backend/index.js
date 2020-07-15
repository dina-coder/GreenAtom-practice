const express = require('express')
const cors = require('cors')
const app = express()

if (process.env.NODE_ENV !== 'production')
	require('dotenv').config()

const port = process.env.EXPRESS_PORT || 9000

app.use(express.json())

app.get('/', (req, res) => {
	res.send("Тут должно быть SPA")
})

app.post('/login', (req, res) => {
	res.send({})
})

app.listen(port, _ => {
	console.log(`Сервер запущен по адресу: http://localhost:${port}`)
})
