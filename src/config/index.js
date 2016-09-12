/**
 * Created by zhangjiasheng on 7/23/16.
 */
export default {
	domain: process.env.NODE_ENV != 'production' ? 'http://localhost:8008/api' : 'http://www.greenicetech.cn/api'
}