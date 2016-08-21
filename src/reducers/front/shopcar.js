/**
 * Created by zhangjiasheng on 16/8/21.
 */
import * as types from '../../actions/const'

export const shopcar = (state = [], action) => {
	console.log(action)
	return [
		...state
	]
}