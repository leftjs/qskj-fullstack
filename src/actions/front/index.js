/**
 * Created by zhangjiasheng on 16/8/13.
 */
import * as user from './user'
import * as shopcar from './shopcar'
import * as common from './common'

export default {
	...user,
	...shopcar,
	...common
}