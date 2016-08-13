/**
 * Created by zhangjiasheng on 7/23/16.
 */
import * as types from '../../actions/const'

export const user = (state = {}, action) => {
	switch (action.type) {
		case `${types.LOGIN}_FULFILLED`:
			return {
				...action.payload
			}
		case `${types.LOGOUT}`:
			return {}
		case `${types.DELETE_USER_BY_ID}_PENDING`:
			return {
				...state,
				delete_user_by_id_loading: true
			}
		case `${types.DELETE_USER_BY_ID}_FULFILLED`:
		case `${types.DELETE_USER_BY_ID}_REJECTED`:
			return {
				...state,
				delete_user_by_id_loading: false
			}
		case `${types.VALIDATE_USER_BY_ID}_PENDING`:
			return {
				...state,
				validate_user_by_id_loading: true
			}
		case `${types.VALIDATE_USER_BY_ID}_FULFILLED`:
		case `${types.VALIDATE_USER_BY_ID}_REJECTED`:
			return {
				...state,
				validate_user_by_id_loading: false
			}
		case `${types.ADD_USER}_PENDING`:
			return {
				...state,
				add_user_loading: true
			}
		case `${types.ADD_USER}_FULFILLED`:
		case `${types.ADD_USER}_REJECTED`:
			return {
				...state,
				add_user_loading: false
			}
		default:
			return {
				...state,
				delete_user_by_id_loading: false,
				validate_user_by_id_loading: false,
				add_user_loading: false
			}
	}

}