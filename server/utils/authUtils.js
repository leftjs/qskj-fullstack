/**
 * Created by zhangjiasheng on 16/8/22.
 */
var jwt = require('jsonwebtoken');
import config from '../config'

/**
 * 生成token
 * @param id
 * @param cb
 */
export const generateToken = (id, cb) => {
	jwt.sign({id}, config.token_secret, {
		expiresIn: '7d'
	}, (err, token) => {
		if (err) cb(err, null)
		else cb(null, token)
	})
}

/**
 * 解开token
 * @param token
 * @returns {*}
 */
export const decodeToken = (token) =>  {
	return jwt.decode(token)
}

/**
 * 验证token
 * @param token
 * @param cb
 */
export const verifyToken = (token, cb) => {
	jwt.verify(token, config.token_secret, (err, decoded) => {
		if(err) return cb(err, null)
		else return cb(null, decoded)
	})
}


// generateToken("asdfff", (err, token) => {
// 	if(err) return console.log(err)
// 	else setTimeout(() => {
// 		verifyToken(token, (err,decoded) => {
// 			if(err) return console.log(err.name === 'TokenExpiredError')
// 			else return console.log(decoded)
// 		})
// 	}, 2000)
// })