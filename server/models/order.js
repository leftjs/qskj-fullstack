/**
 * Created by zhangjiasheng on 7/23/16.
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema
const orderSchema = Schema({
	userId: String, // 用户id
	productId: String, // 产品id
	orderCount: Number, // 订购数量
	orderTime: Date, // 下单时间
	unionPayId: String, // 银联单号
	status: {
		type: String,
		enum: ["待付款", "已付款", "采购中", "入库检测中", "发货中"]
	}
})

export default mongoose.model('Order', orderSchema)