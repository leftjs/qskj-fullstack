/**
 * Created by zhangjiasheng on 7/23/16.
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema
const userSchema = Schema({
	username: String,
	password: String,
	email: String,
	validated: Boolean // 是否认证
})

export default mongoose.model('User', userSchema)