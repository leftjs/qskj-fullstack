/**
 * Created by zhangjiasheng on 7/23/16.
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema
const userSchema = Schema({
	username: {
		type: String,
		required: true,
		index: {
			unique: true
		}
	},
	password: {
		type: String,
		required: true
	},
	email: String,
	validated: {
		type: Boolean,
		default: false
	}, // 是否认证
	realname: String,
	address: String,
	role: {
		type: String,
		enum: [
			"supplier", // 供应商
			"customer", // 顾客,
			"company", // 公司消费者
			"staff",  // 员工
			"admin" // 管理员
		],
		default: 'customer'
	}
})


export default mongoose.model('User', userSchema)