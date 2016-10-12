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

export const logout = () => {
	return dispatch => dispatch({
		type: types.LOGOUT_FRONT
	})
}

export const loginWithToken = (token) => {
	return dispatch => dispatch({
		type: types.LOGIN_WITH_TOKEN,
		payload: new Promise((resolve, reject) => {
			req.get('/users/login/with/token', {}, {'x-token': token}).then((res) => {
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

export const registerPersonal = ({mail, salt, code, username, password, address, realname,type}) => {
	return dispatch => dispatch({
		type: types.REGISTER_PERSONAL,
		payload: new Promise((resolve, reject) => {
			req.post('/users/register', {
				mail,
				salt,
				code,
				username,
				password,
				address,
				realname,
				type
			}).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	})
}

export const registerCompany = ({mail, salt, code, companyName, password, address, businessTime, fixedPhone, businessArea,type}) => {
	return dispatch => dispatch({
		type: types.REGISTER_COMPANY,
		payload: new Promise((resolve, reject) => {
			req.post('/users/register', {
				mail,
				salt,
				code,
				companyName,
				password,
				address,
				businessTime,
				fixedPhone,
				businessArea,
				type
			}).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	})
}

export const addOrUpdateReceiveAddress = ({name, phone, address, token}) => {
	return dispatch => dispatch({
		type: types.ADD_OR_UPDATE_RECEIVE_ADDRESS,
		payload: new Promise((resolve, reject) => {
			req.post('/users/upsert/receive/address', {name, phone, address}, {'x-token': token}).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	})
}


export const deleteReceiveAddress = ({id, token}) => {
	return dispatch => dispatch({
		type: types.DELETE_RECEIVE_ADDRESS,
		payload: new Promise((resolve, reject) => {
			req.remove(`/users/${id}/receive/address`,{}, {'x-token': token}).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	})
}

