var express = require('express');
var router = express.Router();

var _ = require('underscore');
_.str = require('underscore.string');
_.mixin(_.str.exports());//考虑到函数的可用性，要使用Underscore.string需要使用Underscore.js中的mixin函数方式来扩展

var Post = require('../models/Post.js');
var FUNC = require('../common/function.js');

/* GET users listing. */
router.route('/')
	.get(FUNC.checkLogin)
	.get(function(req, res) {
		res.redirect('/u/' + req.session.user.username);
	})
	.post(FUNC.checkLogin)
	.post(function(req, res) {
		var currentUser = req.session.user;
		//验证
		var error = '';
		if (_.trim(req.body.post) == '') {
			error = '请输入内容';
		}
		if (error) {
			return FUNC.returnData(req, res, {
				status: false,
				message: error,
				redirect: '/u/'+ currentUser.username
			});
		}

		var newPost = new Post({
			user: currentUser.username,
			post: req.body.post
		});
		newPost.save(function(err) {
			if (err) {
				console.dir(err);
				return FUNC.returnData(req, res, {
					status: false,
					message: err,
					redirect: '/'
				});
			}
			return FUNC.returnData(req, res, {
				status: true,
				message: '发表成功',
				redirect: '/u/' + currentUser.username
			});
		});
	});

module.exports = router;
