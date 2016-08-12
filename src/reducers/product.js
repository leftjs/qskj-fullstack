/**
 * Created by zhangjiasheng on 7/24/16.
 */
import * as types from '../actions/const'
export const product = (state={}, action) => {
	switch (action.type) {
		case `${types.ADD_PRODUCT}_PENDING`:
			return {
				...state,
				add_product_loading: true
			}
		case `${types.ADD_PRODUCT}_FULFILLED`:
		case `${types.ADD_PRODUCT}_REJECTED`:
			return {
				...state,
				add_product_loading: false
			}
		default:
			return {
				add_product_loading: false
			}
	}
}