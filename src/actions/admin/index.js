/**
 * Created by zhangjiasheng on 7/23/16.
 */
import * as user from './user'
import * as product from './product'
import * as supplier from './supplier'
export default {
	...user,
	...product,
	...supplier
}