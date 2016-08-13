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
