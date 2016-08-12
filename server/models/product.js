/**
 * Created by zhangjiasheng on 7/23/16.
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema
const productSchema = Schema({
	name: String, // 名称
	price: Number, // 单价
	desc: String, // 描述
	quality_guarantee: Number, // 保质期(天)
	image_url: Array, // 配图
	stock: Number // 库存
})

export default mongoose.model('Product', productSchema)