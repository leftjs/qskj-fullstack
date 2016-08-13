/**
 * Created by zhangjiasheng on 7/23/16.
 */
import { combineReducers } from 'redux'
import {routerReducer} from 'react-router-redux'
import * as user from './admin/user'
import * as product from './admin/product'
import * as userFront from './front/user'


export const admin = combineReducers({
	...user,
	...product,
	routing: routerReducer
})

export const front = combineReducers({
	...userFront,
	routing: routerReducer
})
