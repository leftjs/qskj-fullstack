/**
 * Created by zhangjiasheng on 16/8/19.
 */
import React from 'react'
import Radium from 'radium'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Box from './elements/Box'
import {FlatButton, IconButton, TextField, Dialog, SelectField,MenuItem, RaisedButton, Table, TableRow, TableRowColumn,TableHeaderColumn, TableHeader, TableBody} from 'material-ui'
import * as colors from 'material-ui/styles/colors'
import Edit from 'material-ui/svg-icons/image/edit'
import Add from 'material-ui/svg-icons/content/add'
import actions from '../../actions/front'
import ShopCar from './elements/ShopCar'
import Alert from 'react-s-alert'
const styles = {
	container: {
		marginTop: 30,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	box: {
		width: '80%',
		minWidth: '800px'
	},
	addressContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems:'center',
		padding: '1em',
	},
	address: {
		width: '30%',
		padding: '0.8em',
		height: 'auto',
		lineHeight: 'auto',
		borderRadius: 5,
		position: 'relative',
		textAlign: 'left',
		border: `2px solid ${colors.orangeA200}`,
	},
	addressNormal: {
		width: '30%',
		padding: '0.8em',
		height: 'auto',
		lineHeight: 'auto',
		borderRadius: 5,
		position: 'relative',
		textAlign: 'left',
		border: `2px solid ${colors.grey300}`,
	},
	addressSelect: {
		position: 'absolute',
		top: 10,
		right: 10,
		lineHeight: '16px',
		width: 16,
		height: 16,
		borderRadius: 8,
		border: 0,
		color: colors.white,
		textAlign: 'center',
		background: colors.orangeA200

	},
	ellipsis: {
		margin: 0,
		// textOverflow: 'ellipsis', /*这就是省略号喽*/
		// overflow: 'hidden',/*设置超过的隐藏*/
		// whiteSpace: 'nowrap',/*设置不折行*/
		width: '100%'/*设置宽度*/
	},
	invoiceContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems:'center',
		padding: '1em',
	},
	dialogContainer: {
		width: '50%',
		maxWidth: 'none',
	},

}

class Buy extends React.Component {

	state = {
		invoiceEditOpen: false, // 是否打开发票信息编辑界面
		addressAddOpen: false, // 是否打开新增地址页面
		address: {}, // 新增地址临时缓存
		invoices: {}, // 新增发票信息的临时缓存
		addresses: [], // 地址列表
		sheng: [],
		di: [],
		xian: [],
		selectedSheng: '',
		selectedDi: '',
		selectedXian: '',
		selectedReceiveAddress: '', // 所选择的收获地址
	}

	componentWillMount() {
		// 获取省份列表
		this._getShengList()
	}

	/**
	 * 处理收货地址的选择
	 * @param id
	 */
	handleReceiveAddressSelect = (id) => {
		this.setState({
			selectedReceiveAddress: id
		})
	}

	handleInvoiceClose = () => {
		this.setState({
			invoiceEditOpen: false
		})
	}

	handleInvoiceOpen = () => {
		this.setState({
			invoiceEditOpen: true
		})
	}

	invoicesSet = (key, e) => {
		this.setState({
			invoices: {
				...this.state.invoices,
				[key]: e.target.value
			}
		})
	}

	handleAddressAddOpen = () => {
		this.setState({
			addressAddOpen: true
		})
	}

	handleAddressAddClose = () => {
		this.setState({
			addressAddOpen: false
		})
	}

	addressSet = (key, e) => {
		this.setState({
			address: {
				...this.state.address,
				[key]: e.target.value
			}
		})
	}

	_handleAddressAddClick = () => {

		let {detailAddress, name, phone} = this.state.address
		let {selectedSheng, selectedDi, selectedXian} = this.state
		if (!name|| !phone || !selectedSheng || !selectedDi || !selectedXian || !detailAddress) {
			Alert.info("请完整填写收获地址才能提交")
			return
		}
		this.handleAddressAddClose()
		let address = `${selectedSheng}${selectedDi}${selectedXian}${detailAddress}`
		this.props.actions.addOrUpdateReceiveAddress({name, phone, address,
			token: this.props.user.token || localStorage.getItem('token')
		}).then((res) => {
			if (this.props.user.token || localStorage.getItem('token')) {
				this.props.actions.loginWithToken(this.props.user.token || localStorage.getItem('token'))
			}
		}).catch((err) => {
			err.res.then((value) => {
				Alert.error(value.message)
			})
		})
	}
	/**
	 * 处理select框的变动
	 * @param key
	 * @param event
	 * @param index
	 * @param value
	 * @private
	 */
	_handleAddressChange = (key, event, index, value) => {

		// 解决省份变动后的县显示的异常问题
		if (key === 'selectedSheng'){
			this.setState({
				xian: []
			})
		}
		this.setState({
			[key]: value
		})
	}

	/**
	 * 获取省份列表
	 * @private
	 */
	_getShengList = () => {
		const {getCityList} = this.props.actions
		getCityList({level: 1}).then((res) => {
			this.setState({
				sheng: _.map(res.value,(item) => {
					return (
						<MenuItem key={item.sheng} value={item.name} primaryText={item.name} onTouchTap={this._getDiList.bind(this, item.sheng)}/>
					)
				})
			})
		}).catch((err) => {
			console.log(err)
		})

	}

	/**
	 * 获取地区列表
	 * @param sheng
	 * @private
	 */
	_getDiList = (sheng) => {
		const {getCityList} = this.props.actions
		getCityList({level: 2, sheng}).then((res) => {
			this.setState({
				di: _.map(res.value, (item) => {
					return (
						<MenuItem key={item.di} value={item.name} primaryText={item.name} onTouchTap={this._getXianList.bind(this, item.sheng, item.di)}/>
					)
				})
			})
		}).catch((err) => {
			console.log(err)
		})
	}

	/**
	 * 获取县级列表
	 * @param sheng
	 * @param di
	 * @private
	 */
	_getXianList = (sheng, di) => {
		const {getCityList} = this.props.actions
		getCityList({level: 3, sheng, di}).then((res) => {
			this.setState({
				xian: _.map(res.value, (item) => {
					return (
						<MenuItem key={item.xian} value={item.name} primaryText={item.name}/>
					)
				})
			})
		}).catch((err) => {
			console.log(err)
		})
	}

	/**
	 * 渲染收货地址
	 * @returns {XML}
	 * @private
	 */
	_renderReceiveAddress = () => {
		let receiveAddress = (this.props.user && this.props.user.info && this.props.user.info.receiveAddress) || []
		return (
			<div style={styles.addressContainer}>
				{
					!!receiveAddress ? (!this.state.selectedReceiveAddress && receiveAddress.length > 0 && this.setState({selectedReceiveAddress: receiveAddress[0]._id})) || _.map(receiveAddress, (item) => {
						return (
							<FlatButton
								style={this.state.selectedReceiveAddress === item._id ? styles.address : styles.addressNormal}
								key={item._id}
								onTouchTap={this.handleReceiveAddressSelect.bind(this, item._id)}
								icon={
									<div>
										{this.state.selectedReceiveAddress === item._id && <p style={styles.addressSelect}>✓</p>}
										<p style={styles.ellipsis}>{item.name}</p>
										<p style={styles.ellipsis}>{item.phone}</p>
										<p style={styles.ellipsis}>{item.address}</p>
									</div>
								}/>
							)
						}) : <p style={{color: colors.red400}}>请先添加您的收货信息</p>
					}

			</div>
		)
	}

	render(){

		const invoiceActions = [
			<FlatButton
				label="取消"
				onTouchTap={this.handleInvoiceClose}
			/>,
			<FlatButton
				label="确定"
				primary={true}
				keyboardFocused={true}
				onTouchTap={this.handleInvoiceClose}
			/>
		]

		const addressActions = [
			<FlatButton
				label="取消"
				secondary={true}
				onTouchTap={this.handleAddressAddClose}
			/>,
			<FlatButton
				label="确定"
				primary={true}
				keyboardFocused={true}
				onTouchTap={this._handleAddressAddClick}
			/>
		]

		return (

			<div style={styles.container}>
				<Box title="收货信息"
				     style={styles.box}
				     menu={<IconButton tooltip="使用新地址" onTouchTap={this.handleAddressAddOpen}><Add color={colors.grey700}/></IconButton>}>
					<Dialog
						open={this.state.addressAddOpen}
						title="添加收货地址"
						actions={addressActions}
						modal={false}
						onRequestClose={this.handleAddressAddClose}
						contentStyle={styles.dialogContainer}
					>
						<TextField
							onChange={this.addressSet.bind(this, 'name')}
							fullWidth={true}
							floatingLabelText="收件人"
							hintText={`请输入收件人`}/>
						<TextField
							onChange={this.addressSet.bind(this, 'phone')}
							fullWidth={true}
							floatingLabelText="收件人联系方式"
							hintText={`请输入收件人联系方式`}/>

						<SelectField
							style={{width: '100%'}}
							floatingLabelText="地址"
							floatingLabelFixed={true}
							hintText="省"
							value={this.state.selectedSheng}
							onChange={this._handleAddressChange.bind(this, 'selectedSheng')}
						>
							{this.state.sheng}
						</SelectField>
						<SelectField
							style={{width: '100%'}}
							floatingLabelText="市"
							value={this.state.selectedDi}
							onChange={this._handleAddressChange.bind(this, 'selectedDi')}
						>
							{this.state.di}
						</SelectField>
						<SelectField
							style={{width: '100%'}}
							floatingLabelText="县"
							value={this.state.selectedXian}
							onChange={this._handleAddressChange.bind(this, 'selectedXian')}
						>
							{this.state.xian}
						</SelectField>
						<TextField
							onChange={this.addressSet.bind(this, 'detailAddress')}
							fullWidth={true}
							floatingLabelText="详细地址"
							hintText="请输入详细地址"/>
					</Dialog>
					{this._renderReceiveAddress()}

				</Box>
				<Box title={"发票信息"}
				     style={[styles.box, {marginTop: 20}]}
				     menu={
				     	<IconButton tooltip="修改" onClick={this.handleInvoiceOpen}>
				     	  <Edit color={colors.grey700} />
				     	</IconButton>}
				>
					<Dialog
						open={this.state.invoiceEditOpen}
						title="发票信息"
						actions={invoiceActions}
						modal={false}
						onRequestClose={this.handleInvoiceClose}
						contentStyle={styles.dialogContainer}
					>
						{['纳税人识别码', '注册地址', '注册电话', '开户银行', '开户账号', '发票类型', '发票抬头', '发票内容'].map((item,index) => {
							return (
								<TextField
									value={this.state.invoices[item]}
									type={(index === 2 || index === 4) ? 'number' : 'text'}
									onChange={this.invoicesSet.bind(this, item)}
									key={index}
									fullWidth={true}
									floatingLabelText={item}
									hintText={`请输入${item}`}/>
							)
						})}
					</Dialog>
					<div style={styles.invoiceContainer}>
						<p style={styles.ellipsis}>发票类型: {this.state.invoices['发票类型'] || '纸质发票'}</p>
						<p style={styles.ellipsis}>发票抬头: {this.state.invoices['发票抬头'] || (!!this.props.user.info && (this.props.user.info.username || this.props.user.info.companyName)) || '个人'}</p>
						<p style={styles.ellipsis}>发票内容: {this.state.invoices['发票内容'] || '购买商品明细'}</p>
						<p style={styles.ellipsis}>纳税人识别码: {this.state.invoices['纳税人识别码'] || 'xxxxxxxx'}</p>
						<p style={styles.ellipsis}>注册地址: {this.state.invoices['注册地址'] || (!!this.props.user.info && this.props.user.info.address) || 'xx省xx市xx县xx街道'}</p>
						<p style={styles.ellipsis}>注册电话: {this.state.invoices['注册电话'] || (!!this.props.user.info && this.props.user.info.fixedPhone || (!!this.props.user.info && !!this.props.user.info.receiveAddress && !!this.props.user.info.receiveAddress[0] && this.props.user.info.receiveAddress[0].phone)) || 'xxxxxxxxxxx'}</p>
						<p style={styles.ellipsis}>开户银行: {this.state.invoices['开户银行'] || 'xx银行'}</p>
						<p style={styles.ellipsis}>开户账号: {this.state.invoices['开户账号'] || '62xxxxxxxxxxxxxxx'}</p>

						<br/>
						<p style={styles.ellipsis}>发票税务局认可的有效首付款凭证,可作为售后服务凭据</p>
					</div>
				</Box>
				<Box title="购物清单" style={[styles.box, {marginTop: 20}]}>
					<ShopCar/>
				</Box>
			</div>
		)



	}
}

function mapStateToProps(state) {
	/* Populated by react-webpack-redux:reducer */
	const props = {
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



export default connect(mapStateToProps, mapDispatchToProps)(Radium(Buy))