/**
 * Created by zhangjiasheng on 7/23/16.
 */
var express = require('express');
var router = express.Router();
import {uploadMultiple, uploadMiddleware} from '../utils/ossUtils'
import product from '../models/product'
import {validateBodyNull} from '../utils'
import _ from 'lodash'
import * as authUtils from '../utils/authUtils'
import User from '../models/user'
import Order from '../models/order'



router.post('/add', (req, res, next) => {
	let body = req.body
	let {items, total, address, invoice} = body
	console.log(items,total, address, invoice)
	const token = req.header('x-token')
	authUtils.verifyToken(token, (err,decoded) => {
		if(err){
			if (err.name == "TokenExpiredError") {
				return next(customError(401, 'token过期异常'))
			} else {
				return next(customError(401, 'token不正确'))
			}
		}
		User.findOne({_id: decoded.id}, (err,doc) => {
			if (err) return next(customError(400, "数据库出错"))
			if(!doc) return next(customError(400, "该用户信息不存在"))
			Order.create({
				user: doc._id,
				items: _.map(items, (item = {}) => {
					return {
						product: item.id,
						orderCount: item.count,
						total: item.total,
						remark: item.remark,
					}
				}),
				total,
				address,
				invoice,
				orderTime: new Date(),
				status: '待付款'
			}, (err, order) => {
				if (err) return next(customError(400, "数据库出错"))
				if (!order) return next(customError(400, "创建订单失败"))
				res.json(order)
			})
		})
	})
})


module.exports = router;