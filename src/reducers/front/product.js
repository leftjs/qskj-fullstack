/**
 * Created by zhangjiasheng on 16/8/13.
 */
import * as types from '../../actions/const'


export const product = (state = [], action) => {
	switch (action.type) {
		case `${types.GET_ALL_PRODUCTS}_FULFILLED`:
			return [
				...action.payload
			]
		default:
			return state
	}

}