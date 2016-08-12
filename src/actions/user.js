/**
 * Created by zhangjiasheng on 7/23/16.
 */
import * as types from './const'
import * as req from '../services/request'

export const login = () => {
	return dispatch => dispatch({
		type: types.LOGIN,
		payload: new Pormise((resolve, reject) => {
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
		type: types.LOGOUT,
		payload: null
	})
}


export const add_user = (body) => {
	return dispatch => dispatch({
		type: types.ADD_USER,
		payload: new Promise((resolve, reject) => {
			req.post('/users', body).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	})
}


export const get_user_by_page_and_size = ({page,size,validated}) => {
	return dispatch => dispatch({
		type: types.GET_USER_BY_PAGE_AND_SIZE,
		payload: new Promise((resolve, reject) => {
			req.get('/users/list', {page, size, validated}).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	})
}

export const get_all_users = () => {
	return dispatch => dispatch({
		type: types.GET_ALL_USERS,
		payload: new Promise((resolve, reject) => {
			req.get('/users/list/all').then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	})
}

export const delete_user_by_id = ({id}) => {
	return dispatch => dispatch({
		type: types.DELETE_USER_BY_ID,
		payload: new Promise((resolve, reject) => {
			req.remove(`/users/${id}`).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	})
}

export const validate_user_by_id = ({id}) => {
	return dispatch => dispatch({
		type: types.VALIDATE_USER_BY_ID,
		payload: new Promise((resolve, reject) => {
			req.get(`/users/${id}/validate`).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	})
}

