/**
 * Created by zhangjiasheng on 7/23/16.
 */
var express = require('express');
var router = express.Router();
import {uploadMultiple, uploadMiddleware} from '../utils/ossUtils'
import product from '../models/product'
import {validateBodyNull} from '../utils'
import _ from 'lodash'


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

router.post('/add', (req,res,next) => {

})



module.exports = router;