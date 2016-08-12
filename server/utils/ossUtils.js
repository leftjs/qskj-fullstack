/**
 * Created by zhangjiasheng on 7/23/16.
 */
var OSS = require('ali-oss').Wrapper
var fs = require('fs')
var multer = require('multer')
var storage = multer.memoryStorage()
import _ from 'lodash'
import uuid from 'node-uuid'


var client = new OSS({
	region: 'oss-cn-hangzhou',
	accessKeyId: 'D7wyxh0NcajbB9Bk',
	accessKeySecret: 'qIB03kCjbjC3q6WIO1rF6FQGIBr5uJ'
})

export const uploadSingle = (file) => {
	client.useBucket('qs-api')
	return client.put(`${uuid.v4()}.${file.mimetype.split('\/')[1]}`, file.buffer).then((res) => {
		return Promise.resolve(res.url)
	}).catch((err) => {
		console.log(err)
		return Promise.reject(err)
	})
}

export const uploadMultiple = (files) => {
	return Promise.all(_.map(files, (file) => {
		return uploadSingle(file)
	})).then((res) => {
		return Promise.resolve(res)
	}).catch((err) => {
		return Promise.reject(err)
	})
}

export const uploadMiddleware = multer({ storage: storage })

