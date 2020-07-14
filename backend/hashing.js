const sha1 = require('sha1')

module.exports = (email, password) => {
	return sha1(email + password)
}
