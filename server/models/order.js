/**
 * Created by zhangjiasheng on 7/23/16.
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema
const orderSchema = Schema({
	user: String, // 用户id
	items: [{
		product: String, // 产品id
		orderCount: Number, // 订购数量
		total: Number, // 单项合计
		remark: String, // 备注
	}],
	total: Number, // 总项合计
	orderTime: Date, // 下单时间
	unionPayId: String, // 银联单号
	address: {
		name: String,
		phone: String,
		address: String
	},
	invoice: {
		type: Object,
	},
	orderNo: {
		type: String,
		unique: true
	}, // 订单编号
	status: {
		type: String,
		enum: ["待付款", "已付款", "采购中", "入库检测中", "发货中"]
	}
})

export default mongoose.model('Order', orderSchema)