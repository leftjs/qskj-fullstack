var express = require('express');
var router = express.Router();
import user from '../models/user'
import _ from 'lodash'
import * as authUtils from '../utils/authUtils'

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
