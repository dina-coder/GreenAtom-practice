// TODO удалить

const hasher = require('./hashing')

x = ["000", "111", "222", "333", "444", "555",
"666", "777", "888", "999"]

// Пример вызова функции для всех элементов массива
x.forEach(pwd => console.log(pwd + " " + hasher("my_username" + pwd)))
