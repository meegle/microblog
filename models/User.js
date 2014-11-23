var db = require('./db');

function User(user) {
	this.username = user.username;
	this.password = user.password;
}
User.find = function(field, value, callback) {
	var sql = 'SELECT * FROM users WHERE ' + field + ' = ?';
	db.query(sql, [value], function(err, result) {
		if (err) {
			callback(true);
			return;
		}
		callback(false, result);
	});
};
User.prototype.save = function(callback) {
	//存入数据库
	var user = {
		username: this.username,
		password: this.password
	};
	var sql = 'INSERT INTO users SET ?';
	db.query(sql, user, function(err, result) {
		if (err) {
			callback(err);
			return;
		}
		callback(false);
	});
};
module.exports = User;
