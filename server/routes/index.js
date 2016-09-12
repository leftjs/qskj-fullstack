var express = require('express');
var router = express.Router();
import { uploadMiddleware, uploadSingle } from '../utils/ossUtils'
import City from '../models/city'

/* GET home page. */
router.post('/upload/single', uploadMiddleware.single('file'), (req,res,next) => {
	// uploadSingle(req.file)
	uploadSingle(req.file).then((result) => {
		console.log('result', result)
		res.json(result)
	}).catch((err) => {
		return next(customError(400, err.message))
	})
})



router.get('/cityList', (req,res,next) => {
	let {sheng, di} = req.query
	let {level} = req.query

	switch (level){
		case "1":
			// 省
			City.find({level: 1}, (err,list) => {
				if (err) return next(customError(400, err.message))
				res.json(list)
			})
			break
		case "2":
			// 地
			City.find({level: 2, sheng}, (err, list) => {
				if (err) return next(customError(400, err.message))
				res.json(list)
			})
			break
		case "3":
			// 县
			City.find({level: 3, sheng, di}, (err, list) => {
				if (err) return next(customError(400, err.message))
				res.json(list)
			})
			break
		default:
			res.json([])
			break
	}
})

module.exports = router;

