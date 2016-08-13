/**
 * Created by zhangjiasheng on 16/8/13.
 */
import * as types from '../../actions/const'


export const user = (state = {}, action) => {
	switch (action.type) {
		case `${types.LOGIN_FRONT}_FULFILLED`:
			return {
				...action.payload
			}
		default:
			return {
				...state,
			}
	}

}