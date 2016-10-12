/**
 * Created by zhangjiasheng on 16/8/21.
 */
import * as types from '../../actions/const'

export const shopcar = (state = {}, action) => {
	switch (action.type) {
		case `${types.ITEM_ADD}`:{
			// 购物车商品数量的添加,注意的是新增商品的处理
			console.log(action.payload)
			let count = state[action.payload] || 0
			return {
				...state,
				[action.payload]: ++count
			}
		}

		case `${types.ITEM_DELETE}`:{
			// 购物车商品数量减少,注意的是数量为零的商品的删除操作
			let newState = {...state}
			let count = state[action.payload] || 0
			--count
			if (count <= 0) {
				delete newState[action.payload]
				return {
					...newState
				}
			}else {
				return {
					...state,
					[action.payload]: count
				}
			}
		}

		case `${types.ITEM_SET}`:{
			// 购物车商品数量的设置,注意是设置为零时需要删除该商品
			let newState = {...state}
			let {id, count} = action.payload
			if ( count <= 0 ) {
				delete newState[id]
				return {
					...newState
				}
			}else {
				return {
					...state,
					[id]: count
				}
			}
		}
		default:
			return state
	}
}