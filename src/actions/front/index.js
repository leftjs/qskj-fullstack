/**
 * Created by zhangjiasheng on 16/8/13.
 */
import * as user from './user'
import * as order from './order'
import * as shopcar from './shopcar'
import * as common from './common'
import * as product from './product'

export default {
	...user,
	...shopcar,
	...product,
	...common,
	...order
}