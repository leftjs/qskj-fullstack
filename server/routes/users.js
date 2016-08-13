var express = require('express');
var router = express.Router();
import user from '../models/user'
import _ from 'lodash'

router.post('/', (req,res,next) => {
	if(_.has(req.body, '_id')){
		let body = req.body
		let id = body._id
		delete body._id
		user.update({_id: id }, {$set: body}, (err, doc) => {
			if(err) throwCustomError(400, err.message)
			res.json(doc)
		})
	}else {
		user.create({
			...req.body,
			validated: false
		}, (err,doc) => {
			if (err) throwCustomError(400,err.message)
			res.json(doc)
		})
	}

})

router.post('/login', (req,res,next) => {
	console.log(req.body)
	res.json({ok: true})
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
		if (err) throwCustomError(400, err.message)
		user.find({validated}).skip((page - 1) * size).limit(size).exec((err,list) => {
			if (err) throwCustomError(400, err.message)
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
		if(err) throwCustomError(400, err.message)
		res.json(list)
	})
})

router.delete('/:id', (req,res,next) => {
	const id = req.params['id']
	user.find({_id: id}).remove((err, {result}) => {
		if (err) throwCustomError(400, err.message)
		if(result.ok > 0) {
			res.json('success')
		}else{
			throwCustomError(400, "删除失败")
		}
	})
})

router.get('/:id/validate', (req,res,next) => {
	const id = req.params['id']
	user.update({_id: id}, {$set: {
		validated:true
	}}, (err,count) => {
		if(err) throwCustomError(err)
		res.json({
			count
		})
	})
})
module.exports = router;
