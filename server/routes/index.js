var express = require('express');
var router = express.Router();
import { uploadMiddleware, uploadSingle } from '../utils/ossUtils'
import * as cityUtils from '../utils/cityUtils'

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

module.exports = router;

