/**
 * Created by zhangjiasheng on 16/8/13.
 */
import * as types from '../const'
import * as req from '../../services/request'

export const login = (body) => {
	return dispatch => dispatch({
		type: types.LOGIN_FRONT,
		payload: new Promise((resolve, reject) => {
			req.post('/users/login', body).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	})
}

export const sendValidationMail = ({mail, salt}) => {
	return dispatch => dispatch({
		type: types.SEND_VALIDATION_MAIL,
		payload: new Promise((resolve, reject) => {
			req.post('/users/send/validation/mail', {
				mail,
				salt
			}).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	})
}

export const getCityList = ({sheng, di, level}) => {
	return dispatch => dispatch({
		type: types.GET_CITY_LIST,
		payload: new Promise((resolve, reject) => {
			req.get('/citylist', {
				level,
				sheng,
				di
			}).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	})
}

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