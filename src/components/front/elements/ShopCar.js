/**
 * Created by zhangjiasheng on 16/8/21.
 */
import React from 'react'
import Radium from 'radium'
import {browserHistory} from 'react-router'
import {Avatar,RaisedButton, Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn, FlatButton, Checkbox, IconButton, TextField} from 'material-ui'
import * as colors from 'material-ui/styles/colors'
import Add from 'material-ui/svg-icons/content/add-circle-outline'
import Remove from 'material-ui/svg-icons/content/remove-circle-outline'
import CheckCircle from 'material-ui/svg-icons/action/check-circle'
import RadioBtnUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../../../actions/front'
import _ from 'lodash'
import Alert from 'react-s-alert'

const styles = {
	container: {
		// padding: '1em'
	},
	checkbox:{
		width: 0
	},
	noticeNumber: {
		color: colors.red600,
		fontSize: '18px'
	}
}

class ShopCar extends React.Component {

	state = {
		checks: [], // 勾选的商品
	}

	/**
	 * 购物车中单个项目状态的更新
	 * @param id
	 * @private
	 */
	_handleChangeItemStatus = (id) => {
		console.log(id)
		let add = true
		let newChecks = _.compact(_.map(this.state.checks, (item) => {
			if (id === item) {
				add = false
				return null
			}else {
				return item
			}
		}))

		if(add) {
			this.setState({
				checks: [
					...this.state.checks,
					id
				]
			})
		}else {
			this.setState({
				checks: newChecks
			})
		}
	}

	_handleChangeItemStatusAll = (ids) => {
		if ((this.state.checks || []) && this.state.checks.length === ids.length) {
			this.setState({
				checks: []
			})
		}else {
			this.setState({
				checks: [...ids]
			})
		}
	}

	render() {
		let {shopcar, products, remarks} = this.props
		let myShopCar = _.compact(_.map(shopcar, (value, key) => {
			let product = _.find(products, (item) => {
				return item._id === key
			})
			if (!product) {
				return null
			}


			return {
				productId: key,
				count: value,
				image: product.image_url[0],
				price: product.price,
				total: product.price * value,
				name: product.name,
				remark: remarks[key],

			}
		}))


		return (
			<div style={styles.container}>
				<Table selectable={false}>
					<TableHeader displaySelectAll={false} adjustForCheckbox={false} style={{
						background: colors.lightBlue50,
					}}>
						<TableRow>
							<TableHeaderColumn style={{color: colors.grey700, textAlign: 'center', width: '40%'}}>商品名称</TableHeaderColumn>
							<TableHeaderColumn style={{color: colors.grey700, textAlign: 'center', width: '10%'}}>单价</TableHeaderColumn>
							<TableHeaderColumn style={{color: colors.grey700, textAlign: 'center', width: '20%'}}>数量</TableHeaderColumn>
							<TableHeaderColumn style={{color: colors.grey700, textAlign: 'center', width: '10%'}}>应付金额</TableHeaderColumn>
							<TableHeaderColumn style={{color: colors.grey700, textAlign: 'center', width: '20%'}}>备注</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={false}>
						{
							_.map(myShopCar, (item) => {
								return (
									<TableRow>
										<TableRowColumn style={{width: '40%'}}>
											<div style={{
												display: 'flex',
												flexDirection: 'row',
												justifyContent: 'flex-start',
												alignItems: 'center',
												padding: '10px 0'
											}}>
												<Checkbox
													checkedIcon={<CheckCircle />}
													uncheckedIcon={<RadioBtnUnchecked color={colors.red50}/>}
													style={styles.checkbox}
													onCheck={this._handleChangeItemStatus.bind(this, item.productId)}
												  checked={!!_.find(this.state.checks, (inlineItem) => {
												  	return inlineItem === item.productId
												  })}

												/>
												<Avatar size={60}  src={item.image}/>
												<span style={{
										display: 'block',
										width: '100%',
										marginLeft: 10,
								    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis'
									}}>{item.name}</span>
											</div>
										</TableRowColumn>
										<TableRowColumn style={{textAlign: 'center', width: '10%'}}>¥{item.price}</TableRowColumn>
										<TableRowColumn style={{textAlign: 'center', width: '20%'}}>
											<IconButton onTouchTap={() => {
												this.props.actions.itemAdd(item.productId)
											}}>
												<Add color={colors.grey500}/>
											</IconButton>
											<TextField name="count" style={{width: '40%'}} value={item.count} onChange={(e) => {
												this.props.actions.itemSet({
													id: item.productId,
													count: _.toInteger(e.target.value)
												})
											}} inputStyle={{textAlign: 'center'}}/>
											<IconButton onTouchTap={() => {
												this.props.actions.itemDelete(item.productId)
											}}>
												<Remove color={colors.grey500}/>
											</IconButton>
										</TableRowColumn>
										<TableRowColumn style={{textAlign: 'center', width: '10%'}}>¥{item.total}</TableRowColumn>
										<TableRowColumn style={{textAlign: 'center', width: '20%'}}>
											<div>
												<TextField name="remark" style={{width: '100%', textAlign: 'center'}} value={item.remark} onChange={(e) => {
													this.props.actions.productRemark({id: item.productId, remark: e.target.value})
												}} hintText="无"/>
														</div>
													</TableRowColumn>
												</TableRow>
											)
										})
									}

					</TableBody>
				</Table>

				<div style={{
						width: '100%',
						height: '50px',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						padding: 24,
						boxShadow: `0px -1px 1px 2px ${colors.grey200}`,
						background: `${colors.grey50}`
					}}>
					<div style={{
								height: '100%',
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'flex-start',
								alignItems: 'center'
							}}>
						<Checkbox
							checkedIcon={<CheckCircle />}
							uncheckedIcon={<RadioBtnUnchecked/>}
							checked={(this.state.checks || []) && this.state.checks.length > 0 && this.state.checks.length === myShopCar.length}
							label="全选"
							onCheck={() => {
								let ids = _.map(myShopCar, (item) => {
									return item.productId
								})
								this._handleChangeItemStatusAll(ids)
							}}
						  style={{
						  	width: 0,
						  	marginTop: 8
						  }}
						  labelStyle={{
						  	width: 'auto'
						  }}
						/>
						<span style={{marginLeft: 16}}>|</span>
						<FlatButton
							onTouchTap={() => {
								_.forEach(this.state.checks, (item) => {
									console.log(item)
									this.props.actions.itemSet({
										id: item,
										count: 0
									})
								})
							}}
							label="删除选中的商品"
							labelStyle={{color: colors.grey500}} />
					</div>
					<div style={{
						height: '100%',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'flex-end',
						alignItems: 'center'
					}}>
						<div style={{
							marginRight: 10
						}}>
							共<span style={styles.noticeNumber}>{myShopCar.length}</span>件商品,已选择<span style={styles.noticeNumber}>{this.state.checks.length}</span>件商品,总计(不含运费): <span style={styles.noticeNumber}>{_.sum(_.map(this.state.checks, (id) => {
								let item = _.find(myShopCar, (inline) => {
									return inline.productId === id
								})
								if (typeof item === 'array') {
									return item[0] && item[0].total
								}else {
									return item && item.total
								}
						}))}</span>
						</div>
						<RaisedButton label="现在结算" onClick={() => {
							if (!this.state.checks || this.state.checks.length === 0) {
								Alert.error("至少选择一个需要购买的商品")
								return
							}
							let {address, invoice} = this.props.orderInfo
							if (!address){
								Alert.error("请先选择或者输入收货地址")
								return
							}
							if (!invoice){
								Alert.error('请填写发票信息')
								return
							}
							let user = this.props.user
							if (!!user && !!user.info){
								this.props.actions.addOrder({
									items: _.map(this.state.checks, (checked) => {
										let item = _.find(myShopCar, (inlineItem) => {
											return inlineItem.productId === checked
										})
										return {
											id: item.productId,
											count: item.count,
											remark: item.remark,
											total: item.total
										}
									}),
									total: _.sum(_.map(this.state.checks, (id) => {
											let item = _.find(myShopCar, (inline) => {
												return inline.productId === id
											})
											if (typeof item === 'array') {
												return item[0] && item[0].total
											}else {
												return item && item.total
											}
									})),
									token: this.props.user.token || localStorage.getItem('token'),
									address,
									invoice
								}).then((res) => {

									console.log(res)
								}).catch((err) => {
									err.res.then((value) => {
										console.log(value)
									})
								})
							}else {
								console.log('尚未登录')
								browserHistory.push('register')
							}
						}} backgroundColor={colors.orangeA200} labelColor={colors.white}/>
					</div>

				</div>

			</div>
		)
	}
}


function mapStateToProps(state) {
	/* Populated by react-webpack-redux:reducer */
	const props = {
		shopcar: state.shopcar,
		products: state.product,
		remarks: state.remarks,
		user: state.user
	};
	return props;
}
function mapDispatchToProps(dispatch) {
	/* Populated by react-webpack-redux:action */
	return {
		actions: {...bindActionCreators(actions, dispatch)}
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(Radium(ShopCar))

