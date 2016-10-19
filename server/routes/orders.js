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
import Product from '../models/product'


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

			// 订单生成时间
			let date = new Date()

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
				orderNo: `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}${date.getHours()}${date.getMinutes()}${Math.round(Math.random() * 1000000)}`,
				orderTime: date,
				status: '待付款'
			}, (err, order) => {
				if (err) return next(customError(400, "数据库出错"))
				if (!order) return next(customError(400, "创建订单失败"))
				res.json(order)
			})
		})
	})
})

/**
 * 生成接受单个id的根据给定的数据表查询单条数据的async函数
 */
const loadOneByClass = (clazz) => {
	return async (id) => {
		return await new Promise((resolve, reject) => {
			clazz.findOne({_id: id}, (err, user) => {
				if (err) {
					reject(err)
				}else {
					resolve(user.toJSON())
				}
			})
		})
	}
}

/**
 * promiseAll async化
 */
const asyncPromiseAll = async (array) => {
	return new Promise((resolve, reject) => {
		Promise.all(array).then(values => {
			resolve(values)
		}).catch(err => {
			reject(err)
		})
	})
}

/**
 * 获取单个订单详情
 */
router.get('/:id/detail', async (req,res,next) => {
	let id = req.params['id']
	try {
		let order = await loadOneByClass(Order)(id)
		order.user = await loadOneByClass(User)(order.user)
		let array = _.map(order.items, (item) => {
			return new Promise(async (resolve,reject) => {
				try {
					let product = await loadOneByClass(Product)(item.product)
					resolve({
						...item,
						product
					})
				} catch (err) {
					reject(err)
				}
			})
		})
		order.items = await asyncPromiseAll(array)
		res.json(order)
	} catch (err) {
		return next(customError(400, err.message))
	}
})


module.exports = router;