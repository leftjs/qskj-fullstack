/**
 * Created by zhangjiasheng on 16/8/19.
 */
import React from 'react'
import Radium from 'radium'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Box from './elements/Box'
import {FlatButton, IconButton, TextField, Dialog, RaisedButton, Table, TableRow, TableRowColumn,TableHeaderColumn, TableHeader, TableBody} from 'material-ui'
import * as colors from 'material-ui/styles/colors'
import Edit from 'material-ui/svg-icons/image/edit'
import Add from 'material-ui/svg-icons/content/add'
import actions from '../../actions/front'
import ShopCar from './elements/ShopCar'

const styles = {
	container: {
		marginTop: 30,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	box: {
		width: '80%'
	},
	addressContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems:'center',
		padding: '1em',
	},
	address: {
		// display: 'flex',
		width: '30%',
		padding: '0.8em',
		height: 'auto',
		lineHeight: 'auto',
		borderRadius: 5,
		border: `2px solid ${colors.orangeA200}`,
		position: 'relative',
		textAlign: 'left'
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
		invoiceEditOpen: false,
		items: []
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



	itemSet = (val1, val2) => {
		console.log('----->>>>', this)
		console.log(val1, val2)
		this.setState({
			items: [{
				'123': 123
			}]
		})
	}

	render(){
		const invoiceActions = [
			<FlatButton
				label="取消"
				secondary={true}
				onTouchTap={this.handleInvoiceClose}
			/>,
			<FlatButton
				label="确定"
				primary={true}
				keyboardFocused={true}
				onTouchTap={this.handleInvoiceClose}
			/>
		]
		return (

			<div style={styles.container}>
				<Box title="收货信息"
				     style={styles.box}
				     menu={<IconButton tooltip="使用新地址"><Add color={colors.grey700}/></IconButton>}>
					<div style={styles.addressContainer}>
						<FlatButton style={styles.address} icon={
							<div>
								<p style={styles.addressSelect}>✓</p>
								<p style={styles.ellipsis}>张三</p>
								<p style={styles.ellipsis}>17012346896</p>
								<p style={styles.ellipsis}>上海市上海浦东新区软杨南路哈哈懂第三方达</p>
							</div>
						}/>
					</div>
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
						{['开户银行','纳税人识别码', '注册地址', '注册电话', '开户银行', '开户账号'].map((item,index) => {
							return (
								<TextField onChange={this.itemSet.bind(this, '123', 123)} key={index} fullWidth={true} floatingLabelText={item} hintText={`请输入${item}`}/>
							)
						})}
					</Dialog>
					<div style={styles.invoiceContainer}>
						<p style={styles.ellipsis}>发票类型:纸质发票</p>
						<p style={styles.ellipsis}>发票抬头:青霜科技</p>
						<p style={styles.ellipsis}>发票内容:购买商品明细</p>
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