/**
 * Created by zhangjiasheng on 7/24/16.
 */
import * as types from './const'
import * as req from '../services/request'

export const add_supplier = (body) => {
	return dispatch => dispatch({
		type: types.ADD_SUPPLIER,
		payload: new Promise((resolve, reject) => {
			req.post('/suppliers', body).then((res) => {
				resolve(res)
			}).then((err) => {
				reject(err)
			})
		})
	})
}


export const get_suppliers_by_page_and_size = ({page, size}) => {
	return dispatch => dispatch({
		type: types.GET_SUPPLIERS_BY_PAGE_AND_SIZE,
		payload: new Promise((resolve, reject) => {
			req.get('/suppliers/list', {page, size}).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	})
}


export const get_all_suppliers = () => {
	return dispatch => dispatch({
		type: types.GET_ALL_SUPPLIERS,
		payload: new Promise((resolve,reject) => {
			req.get('/suppliers/all').then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	})
}

export const delete_supplier_by_id = (id) => {
	return dispatch => dispatch({
		type: types.DELETE_SUPPLIER_BY_ID,
		payload: new Promise((resolve, reject) => {
			req.remove(`/suppliers/${id}`).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	})
}