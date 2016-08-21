/**
 * Created by zhangjiasheng on 16/8/21.
 */
import * as types from '../const'

export const itemAdd = (id) => {
	return dispatch => dispatch({
		type: types.ITEM_ADD,
		payload: id
	})
}

export const itemDelete = (id) => {
	return dispatch => dispatch({
		type: types.ITEM_DELETE,
		payload: id
	})
}


export const itemSet = ({id, count}) => {
	return dispatch => dispatch({
		type: types.ITEM_SET,
		payload: {
			id,
			count
		}
	})
}