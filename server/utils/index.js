/**
 * Created by zhangjiasheng on 7/23/16.
 */
import _ from 'lodash'

export const validateBodyNull = (body) => {
	if (_.some(_.values(body), (ele) => {
			return _.isNil(ele) || _.isEmpty(ele)
		})) {
		throwCustomError(400, '请填写完整的信息')
	}
}