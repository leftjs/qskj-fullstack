/**
 * Created by zhangjiasheng on 16/8/13.
 */
import * as types from '../const'
import * as req from '../../services/request'

/**
 * 上传单个文件
 * @param data
 * @returns {function(*): *}
 */
export const uploadSingle = (data) => {
	return dispatch => dispatch({
		type: types.UPLOAD_SINGLE,
		payload: new Promise((resolve, reject) => {
			req.upload('/upload/single', data).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	})
}

/**
 * 个人信息注册
 * @param mail
 * @param salt
 * @param code
 * @param username
 * @param password
 * @param address
 * @param realname
 * @returns {function(*): *}
 */
export const registerPersonal = ({mail, salt, code, username, password, address, realname}) => {
	return dispatch => dispatch({
		type: types.REGISTER_PERSONAL,
		payload: new Promise((resolve, reject) => {
			req.post('/users/register/personal', {
				mail,
				salt,
				code,
				username,
				password,
				address,
				realname
			}).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	})
}
