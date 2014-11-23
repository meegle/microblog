var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var _ = require('underscore');
_.str = require('underscore.string');
_.mixin(_.str.exports());//考虑到函数的可用性，要使用Underscore.string需要使用Underscore.js中的mixin函数方式来扩展

var User = require('../models/User.js');
var FUNC = require('../common/function.js');

router.route('/')
	.get(FUNC.checkNotLogin)
	.get(function(req, res) {
		res.render('login', {title: '用户登入'});
	})
	.post(FUNC.checkNotLogin)
	.post(function(req, res) {
		//验证
		var error = '';
		if (_.trim(req.body.username) == '') {
			error = '请输入用户名';
		} else if (_.trim(req.body.password) == '') {
			error = '请输入密码';
		}
		if (error) {
			return FUNC.returnData(req, res, {
				status: false,
				message: error,
				redirect: '/login'
			});
		}
		//生成口令的散列值
		var md5 = crypto.createHash('md5');
		var password = md5.update(req.body.password).digest('hex');

		User.find('username', req.body.username, function(err, user) {
			if (!user.length) {
				return FUNC.returnData(req, res, {
					status: false,
					message: '用户不存在',
					redirect: '/login'
				});
			}
			user = _.first(user);
			if (user.password != password) {
				return FUNC.returnData(req, res, {
					status: false,
					message: '用户口令错误',
					redirect: '/login'
				});
			}
			req.session.user = user;
			return FUNC.returnData(req, res, {
				status: true,
				message: '登入成功',
				redirect: '/'
			});
		});
	});

module.exports = router;
