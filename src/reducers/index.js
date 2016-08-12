/**
 * Created by zhangjiasheng on 7/23/16.
 */
import { combineReducers } from 'redux'
import {routerReducer} from 'react-router-redux'
import * as user from './user'
import * as product from './product'
// export default combineReducers({
// 	...user,
// 	...product,
// 	routing: routerReducer
// })

export const admin = combineReducers({
	...user,
	...product,
	routing: routerReducer
})

export const front = combineReducers({
	...user,
	...product,
	routing: routerReducer
})
