var express = require('express');
var router = express.Router();
import _ from 'lodash'
import supplier from '../models/supplier'
/**
 * 发布或更新
 */
router.post('/', (req, res, next) => {
	const body = req.body
	return supplier.create({
		name: body.name,
		phone: body.phone,
		email: body.email,
		competency: body.competency
	}, (err, doc) => {
		if(err) return next(customError(400, err.message))
		res.json(doc)
	})
})


/**
 * 分页获取供应商
 */
router.get('/list', (req,res,next) => {
	let page = parseInt(req.query['page'])
	let size = parseInt(req.query['size'])
	if (page < 1) page = 1
	supplier.count({}, (err, count) => {
		if(err) return next(customError(400, err.message))
		supplier.find({}).skip(parseInt((page - 1 ) * size)).limit(parseInt(size)).exec((err, list) => {
			if(err) return next(customError(400, err.message))
			res.json({
				data: list,
				totalDataSize: count,
				sizePerPage: parseInt(size),
				currentPage: parseInt(page)
			})
		})
	})
})

/**
 * 获取所有供应商信息
 */
router.get('/all', (req,res,next) => {
	supplier.find({}).exec((err,list ) => {
		if (err) return next(customError(400, err.message))
		res.json(list)
	})
})

/**
 * 删除指定供应商信息
 */
router.delete('/:id', (req,res,next) => {
	let id = req.params['id']
	supplier.find({_id: id}).remove((err, {result}) => {
		console.log(result.ok)
		if (err) return next(customError(400, err.message))
		if (result.ok > 0) {
			res.json('success')
		}else {
			return next(customError(400, "删除失败"))
		}
	})
})


module.exports = router;
