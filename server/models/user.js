/**
 * Created by zhangjiasheng on 7/23/16.
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema
const userSchema = Schema({
	username: {
		type: String,
		index: {
			unique: true
		}
	}, // 个人名称
	companyName: {
		type: String,
		index: {
			unique: true
		}
	}, // 公司名称,
	licenceCode: String, // 营业执照编号
	businessTime: Number, // 营业年限,
	fixedPhone: String, // 固定电话,
	businessArea: String, //经营范围
	password: {
		type: String,
		required: true
	}, // 密码
	email: {
		type: String,
		required: true
	}, // 邮箱
	validated: {
		type: Boolean,
		default: false
	}, // 是否认证
	realname: String, // 真实姓名
	address: String, //
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
	},
	images: Schema.Types.Mixed
})


export default mongoose.model('User', userSchema)