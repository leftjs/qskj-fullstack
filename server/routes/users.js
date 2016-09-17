var express = require('express');
var router = express.Router();
import user from '../models/user'
import _ from 'lodash'
import * as authUtils from '../utils/authUtils'
import * as mailUtils from '../utils/mailUtils'
import * as md5Utils from '../utils/md5Utils'

/**
 * 后台添加用户
 */
router.post('/', (req,res,next) => {
	if(_.has(req.body, '_id')){
		let body = req.body
		let id = body._id
		delete body._id
		user.update({_id: id }, {$set: body}, (err, doc) => {
			if(err) return next(customError(400, err.message))
			res.json(doc)
		})
	}else {

		user.create({
			...req.body,
			validated: req.body.role != 'supplier'
		}, (err,doc) => {
			if (err) return next(customError(400,err.message))
			res.json(doc)
		})
	}

})

/**
 * 邮箱下发验证码
 */
router.post('/send/validation/mail', (req,res,next) => {
	let {mail, salt} = req.body
	console.log(mail, salt)
	let md5Str = md5Utils.md5(`${mail}${salt}`)
	mailUtils.sendMail(mail, '验证码邮件,请勿回复', `<h3>您的验证码为:</h3><p style="font-size: 20px; color: red;">${md5Str.substring(md5Str.length - 4)}</p>`, (err, info) => {
		if(err) {
			return next(err)
		}else {
			res.json(salt)
		}
	})
})

/**
 * 个人/企业用户注册
 */
router.post('/register', (req,res,next) => {
	let {
		username,
		realname,
		code,
		mail,
		salt,
		password,
		companyName,
		licenceCode,
		businessTime,
		fixedPhone,
		businessArea,
		address,
		image1,
		image2,
		image3,
		type
	} = req.body
	let md5Str = md5Utils.md5(`${mail}${salt}`)
	if (md5Str.substring(md5Str.length - 4) != code) {
		return next(customError(400, '验证码错误,请返回检查'))
	}
	user.create({
		username,
		role: type,
		realname,
		email: mail,
		companyName,
		password,
		licenceCode,
		businessTime,
		fixedPhone,
		businessArea,
		address,
		images: {
			image1,
			image2,
			image3
		}
	},(err, doc) => {
		if (err) return next(customError(400, err.message))
		if (!doc) return next(customError(400, '用户注册失败'))
		delete doc.password
		res.json(doc)
	})
})

router.get('/list', (req,res,next) => {
	let page = parseInt(req.query['page'])
	const size = parseInt(req.query['size'])
	const validated = req.query['validated']
	console.log(validated)
	if (page < 1 ) {
		page = 1
	}
	user.count({}).exec((err,count) => {
		if (err) return next(customError(400, err.message))
		user.find({validated}).skip((page - 1) * size).limit(size).exec((err,list) => {
			if (err) return next(customError(400, err.message))
			res.json({
				data: list,
				totalDataSize: count,
				sizePerPage: size,
				currentPage: page
			})
		})
	})
})

router.get('/list/all', (req,res,next) => {
	user.find({}).exec((err, list) => {
		if(err) return next(customError(400, err.message))
		res.json(list)
	})
})

router.delete('/:id', (req,res,next) => {
	const id = req.params['id']
	user.find({_id: id}).remove((err, {result}) => {
		if (err) return next(customError(400, err.message))
		if(result.ok > 0) {
			res.json('success')
		}else{
			return next(customError(400, "删除失败"))
		}
	})
})

router.get('/:id/validate', (req,res,next) => {
	const id = req.params['id']
	user.update({_id: id}, {$set: {
		validated:true
	}}, (err,count) => {
		if(err) return next(customError(err))
		res.json({
			count
		})
	})
})

router.post('/login', (req,res,next) => {
	const body = req.body
	const username = body.username
	const password = body.password
	const role = body.role

	user.findOne({username, password,role},(err, doc) => {
		if (err) return next(customError(400, '数据库出错'))
		if (!doc) return next(customError(400,'用户名或密码出错'))
		authUtils.generateToken(doc._id, (err,token) => {
			if (err) return next(customError(400, "生成token失败"))
			return res.json(token)
		})
	})
})

router.get('/login/with/token', (req,res,next) => {
	const token = req.header('x-token')
	authUtils.verifyToken(token, (err,decoded) => {
		if(err){
			if (err.name == "TokenExpiredError") {
				return next(customError(401, 'token过期异常'))
			} else {
				return next(customError(401, 'token不正确'))
			}
		}
		user.findOne({_id: decoded.id}, (err,doc) => {
			if (err) return next(customError(400, "数据库出错"))
			if(!doc) return next(customError(400, "该用户信息不存在"))
			let user = doc.toJSON()
			delete user.password
			return res.json(user)
		})
	})
})


module.exports = router;
