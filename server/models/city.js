/**
 * Created by zhangjiasheng on 16/8/21.
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema

// {"code":"110000","sheng":"11","di":"00","xian":"00","name":"北京市","level":1}
var citySchema = Schema({
	code: String,
	sheng: String,
	di: String,
	xian: String,
	name: String,
	level: Number
})

export default mongoose.model('city', citySchema)