/**
 * Created by zhangjiasheng on 16/9/27.
 */
import React from 'react'
import actions from '../../actions/front'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Box from './elements/Box'
import {browserHistory} from 'react-router'
import logoYellow from '../../images/front/logo_yellow.png'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Alert from 'react-s-alert'
class Login extends React.Component {

	state = {
		email: '',
		password: '',
	}
	render() {
		return (
				<Paper style={{textAlign: 'center', width: '30%', minWidth: '300px', margin: '100px auto', borderRadius: 10, padding: '30px 0px'}} zDepth={2}>
					<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
						<img src={logoYellow} alt=""/>
						<h3>欢迎登录青霜科技</h3>
						<TextField
							hintText="请输入邮箱"
							floatingLabelText="邮箱"
							style={{marginRight: 10}}
						  onChange={(e) => {
						  	this.setState({
						  		email: e.target.value
						  	})
						  }}
						/>
						<TextField
							onChange={(e) => {
								this.setState({
									password: e.target.value
								})
							}}
							hintText="请输入密码"
							floatingLabelText="密码"
							style={{marginRight: 10}}
						/>
						<div>
							<FlatButton label="没有账号？" primary={true} onTouchTap={() => { browserHistory.push('register')}}/>
							<FlatButton label="忘记密码？" secondary={true} />
						</div>
						<div style={{width: '100%', maxWidth: 256, marginTop: 20}}>
							<RaisedButton label='登录' primary={true} fullWidth={true} onTouchTap={(e) => {
								this.props.actions.login({email: this.state.email, password: this.state.password}).then((res) => {
									localStorage.setItem('token', res.value)
									this.props.actions.loginWithToken(res.value).then((res) => {
										// 登录成功
										browserHistory.push('/')
									}).catch((err) => {
										err.res.then((value) => {
											Alert.error(value.message)
										})
									})
								}).catch((err) => {
									err.res.then((value) => {
										Alert.error(value.message)
									})
								})
							}}/>
						</div>
					</div>
				</Paper>
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
export default connect(mapStateToProps, mapDispatchToProps)(Login)