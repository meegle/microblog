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
		res.render('reg', {title: '用户注册'});
	})
	.post(FUNC.checkNotLogin)
	.post(function(req, res) {
		//验证
		var error = '';
		if (_.trim(req.body.username) == '') {
			error = '请输入用户名';
		} else if (_.trim(req.body.password) == '') {
			error = '请输入密码';
		} else if (req.body['password-repeat'] != req.body['password']) {//检验用户两次输入的口令是否一致
			error = '两次输入的口令不一致';
		}
		if (error) {
			return FUNC.returnData(req, res, {
				status: false,
				message: error,
				redirect: '/reg'
			});
		}
		//生成口令的散列表
		var md5 = crypto.createHash('md5');
		var password = md5.update(req.body.password).digest('hex');

		var newUser = new User({
			username: req.body.username,
			password: password
		});

		//检查用户名是否已经存在
		User.find('username', newUser.username, function(err, user) {
			if (user.length) {
				err = '用户已存在';
			}
			if (err) {
				return FUNC.returnData(req, res, {
					status: false,
					message: err,
					redirect: '/reg'
				});
			}
			//如果不存在则新增用户
			newUser.save(function(err) {
				if (err) {
					return FUNC.returnData(req, res, {
						status: false,
						message: err,
						redirect: '/reg'
					});
				}
				req.session.user = newUser;//写入会话
				return FUNC.returnData(req, res, {
					status: true,
					message: '注册成功',
					redirect: '/'
				});
			});
		})
	});

module.exports = router;
