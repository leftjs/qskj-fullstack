/**
 * Created by zhangjiasheng on 2016/10/12.
 */
import * as types from '../const'
import * as req from '../../services/request'

export const getProductsList = () => {
	return dispatch => dispatch({
		type: types.GET_ALL_PRODUCTS,
		payload: new Promise((resolve,reject) => {
			req.get('/products/all').then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	})
}


