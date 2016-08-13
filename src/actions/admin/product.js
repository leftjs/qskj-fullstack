/**
 * Created by zhangjiasheng on 7/24/16.
 */
import * as types from '../const'
import * as req from '../../services/request'

export const addProduct = (body) => {
	return dispatch => dispatch({
		type: types.ADD_PRODUCT,
		payload: new Promise((resolve, reject) => {
			req.postFormData(`/products/`, body).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	})
}

export const getProductByPageAndSize = ({page, size}) => {
	return dispatch => dispatch({
		type: types.GET_PRODUCT_BY_PAGE_AND_SIZE,
		payload: new Promise((resolve, reject) => {
			req.get(`/products/list`, {
				page,
				size
			}).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		}),
		meta: {
			size
		}
	})
}


export const getAllProducts = () => {
	return dispatch => dispatch({
		type: types.GET_ALL_PRODUCTS,
		payload: new Promise((resolve, reject) => {
			req.get('/products/all').then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	})
}

export const deleteProductById = ({id}) => {
	return dispatch => dispatch({
		type: types.DELETE_PRODUCT_BY_ID,
		payload: new Promise((resolve, reject) => {
			req.remove(`/products/${id}`).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	})
}
