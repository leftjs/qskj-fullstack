/**
 * Created by zhangjiasheng on 7/29/16.
 */
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const supplierSchema = Schema({
	name: String,
	phone: String,
	email: String,
	competency: Array
})


export default mongoose.model("Supplier", supplierSchema)