/**
 * Created by zhangjiasheng on 7/23/16.
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema
const userSchema = Schema({
	username: String,
	password: String,
	email: String,
	validated: Boolean, // 是否认证
	role: {
		type: String,
		enum: [
			"supplier", // 供应商
			"customer", // 顾客
			"staff",  // 员工
			"admin" // 管理员
		]
	}
})

export default mongoose.model('User', userSchema)