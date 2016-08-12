/**
 * Created by zhangjiasheng on 7/23/16.
 */
var express = require('express');
var router = express.Router();
import {uploadMultiple, uploadMiddleware} from '../utils/ossUtils'
import product from '../models/product'
import {validateBodyNull} from '../utils'
import _ from 'lodash'

router.post('/',uploadMiddleware.array('files'), (req,res,next) => {

	validateBodyNull(req.body)

	let body = req.body
	console.log(body)
	if(_.has(body, '_id')) {
		uploadMultiple(req.files).then((result) => {
			let id = body._id
			delete body._id
			product.update({_id: id}, {$set: body},(err,result) => {
				if (err) throwCustomError(400, err.message)
				res.json(result)
			})
		}).catch((err) => {
			throwCustomError(400, err.message)
		})
	}else {
		uploadMultiple(req.files).then((result) => {
			product.create({
				...req.body,
				image_url: result
			}, (err,doc) => {
				if(err) {
					throwCustomError(400, err.message)
				}
				console.log(doc)
				res.json(doc)
			})
		}).catch((err) => {
			throwCustomError(400, err.message)
		})
	}

});

/**
 * 分页获取商品
 */
router.get('/list', (req,res,next) => {
	let page = parseInt(req.query['page'])
	let size = parseInt(req.query['size'])
	if (page < 1) page = 1
	console.log(page, size)
	product.count({}, (err, count) => {
		if(err) throwCustomError(400, err.message)
		product.find({}).skip(parseInt((page - 1 ) * size)).limit(parseInt(size)).exec((err, list) => {
			if(err) throwCustomError(400, err.message)
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
 * 获取所有商品
 */
router.get('/all', (req,res,next) => {
	product.find({}).exec((err,list) => {
		if(err) throwCustomError(400, err.message)
		res.json(list)
	})
})

router.delete('/:id', (req,res,next) => {
	let id = req.params['id']
	product.find({_id: id}).remove((err, {result}) => {
		if(err) throwCustomError(400, err.message)
		if(result.ok > 0) {
			res.json('success')
		}else {
			throwCustomError(400, "删除失败")
		}
	})
})



module.exports = router;