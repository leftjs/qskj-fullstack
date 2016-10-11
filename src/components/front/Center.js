/**
 * Created by zhangjiasheng on 16/9/27.
 */
import React from 'react'
import actions from '../../actions/front'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as colors from 'material-ui/styles/colors'
import {browserHistory} from 'react-router'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import PersonSvgIcon from 'material-ui/svg-icons/social/person'
import Box from './elements/Box'
import IconButton from 'material-ui/IconButton'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Alert from 'react-s-alert'
import {CardTitle} from 'material-ui/Card'
import OrderItem from './elements/OrderItem'


const menus = ["我的首页", "我的账户", "我的订单", "评论", "收藏", "消息", "购物车", "售后服务"]

class Center extends React.Component {
	state = {
		selected: menus[2]
	}

	_renderContent = () => {
		switch (this.state.selected) {
			case menus[0]:
				// 我的首页
				return (
					<Box title={menus[0]}>
						asdf
					</Box>
				)
			case menus[1]:
				// 我的账户
				return (
					<Box title={menus[1]}>
						<div style={{padding: '2em', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
							<PersonSvgIcon color={colors.white} style={{ background: colors.grey400, borderRadius: 8, width: '80px', height: '80px'}}/>
							<RaisedButton label="上传/修改头像"  primary={true} style={{marginLeft: '2em'}}/>
						</div>
						<Divider />
						<div style={{padding: '1em', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
							<CardTitle title="账户昵称" subtitle="小包子" titleStyle={{fontSize: '2rem'}}/>
							<RaisedButton label="修改昵称"  primary={true} style={{marginLeft: '2em'}}/>
						</div>
						<div style={{padding: '1em', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
							<CardTitle title="手机号码" subtitle="1701****896" titleStyle={{fontSize: '2rem'}}/>
							<RaisedButton label="修改号码"  primary={true} style={{marginLeft: '2em'}}/>
						</div>
						<div style={{padding: '1em', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
							<CardTitle title="密码" subtitle="******" titleStyle={{fontSize: '2rem'}}/>
							<RaisedButton label="修改密码"  primary={true} style={{marginLeft: '2em'}}/>
						</div>

					</Box>
				)
			case menus[2]:
				// 我的订单

				const topButtonsHeight = 50
				const orderTitleHeight = 50
				const orderItemHeight = 80
				return (
					<Box title={menus[2]}>
						<div style={{ height: topButtonsHeight, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
							<FlatButton label="代发货订单"/>
							<FlatButton label="待收货订单"/>
							<FlatButton label="已完成订单"/>
						</div>
						<div style={{background: `linear-gradient(to bottom, red 50px, transparent 0`, width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-start'}}>
							<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
								<span style={{height: orderTitleHeight, lineHeight: `${topButtonsHeight}px`}}>2016-09-08 16:09   订单号:123412341234</span>
								<div>
									<img style={{width: orderItemHeight, height: orderItemHeight, padding: 5}} src={require('../../images/front/logo.png')} alt=""/>
									<span style={{marginLeft: 20}}>阿萨德法师打发水电费</span>
								</div>
							</div>
							<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
								<span style={{height: orderTitleHeight, lineHeight: `${topButtonsHeight}px`}}>单价</span>
								<span style={{height: orderItemHeight, lineHeight: `${orderItemHeight}px`}}>¥216.00</span>
							</div>
							<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
								<span style={{height: orderTitleHeight, lineHeight: `${topButtonsHeight}px`}}>数量</span>
								<span style={{height: orderItemHeight, lineHeight: `${orderItemHeight}px`}}>1</span>
							</div>
							<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
								<span style={{height: orderTitleHeight, lineHeight: `${topButtonsHeight}px`}}>应付总额</span>
								<span style={{height: orderItemHeight, lineHeight: `${orderItemHeight}px`}}>¥216.00</span>
							</div>
							<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
								<span style={{height: orderTitleHeight, lineHeight: `${topButtonsHeight}px`}}>操作</span>
								<div style={{height: orderItemHeight, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
									<RaisedButton primary={true} style={{color: colors.white}}>订单详情</RaisedButton>
								</div>
							</div>
						</div>
					</Box>
				)
			default:
				return
		}
	}

	render() {
		return (
			<div style={{margin: '50px auto', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center'}} >
				<Paper style={{
					display: 'inline-block',
          margin: ''
					}}>
					<div style={{ margin: '1em', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
						<PersonSvgIcon color={colors.white} style={{ background: colors.grey400, borderRadius: 10, width: '100px', height: '100px'}}/>
						<h4>小包子 <span style={{color: colors.blue400}}>V</span><span style={{color: colors.blue400}}>1</span></h4>
					</div>
					<Menu >
						{menus.map((ele) => {
							return (
								<MenuItem primaryText={ele} checked={this.state.selected === ele} onTouchTap={() => {
									this.setState({
										selected: ele
									})
								}} />
							)
						})}

					</Menu>
				</Paper>
				<div style={{width: '60%', marginLeft: '1em'}}>
					{this._renderContent()}
				</div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Center)