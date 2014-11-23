var db = require('./db');

function Post(post) {
	this.user = post.user;
	this.post = post.post;
	if (post.time) {
		this.time = post.time;
	} else {
		this.time = new Date();
	}
};

Post.find = function(field, value, callback) {
	var sql = 'SELECT * FROM posts WHERE ' + field + ' = ?';
	db.query(sql, [value], function(err, result) {
		if (err) {
			callback(true);
			return;
		}
		callback(false, result);
	});
};

Post.prototype.save = function(callback) {
	var info = {
		user: this.user,
		post: this.post,
		time: this.time
	};
	var sql = 'INSERT INTO posts SET ?';
	db.query(sql, info, function(err, result) {
		if (err) {
			callback(err);
			return;
		}
		callback(false);
	});
};

module.exports = Post;