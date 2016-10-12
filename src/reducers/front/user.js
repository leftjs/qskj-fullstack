/**
 * Created by zhangjiasheng on 16/8/13.
 */
import * as types from '../../actions/const'


export const user = (state = {}, action) => {
	switch (action.type) {
		case `${types.LOGIN_FRONT}_FULFILLED`:
			return {
				...state,
				token: action.payload
			}
		case `${types.LOGIN_WITH_TOKEN}_FULFILLED`:
			return {
				...state,
				info: {
					...action.payload
				}
			}
		case `${types.LOGOUT_FRONT}`:{
			let inlineState = {...state}
			delete inlineState.info
			delete inlineState.token
			localStorage.removeItem('token')
			return {
				...inlineState
			}
		}

		default:
			return state
	}

}