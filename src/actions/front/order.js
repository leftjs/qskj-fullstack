/**
 * Created by zhangjiasheng on 16/8/13.
 */
import * as types from '../const'
import * as req from '../../services/request'

export const addOrder = ({items, total, token, address, invoice}) => {
	return dispatch => dispatch({
		type: types.ADD_ORDER,
		payload: new Promise((resolve, reject) => {
			req.post('/orders/add', {
				items,
				total,
				address,
				invoice
			}, {
				'x-token': token
			}).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	})

}
