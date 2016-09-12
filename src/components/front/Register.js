/**
 * Created by zhangjiasheng on 16/9/11.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {Step, Stepper, StepLabel} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import CheckCircle from 'material-ui/svg-icons/action/check-circle'
import {MenuItem,SelectField} from 'material-ui'
import Box from './elements/Box'
import actions from '../../actions/front'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {browserHistory} from 'react-router'
import * as colors from 'material-ui/styles/colors'
import Alert from 'react-s-alert'
import _ from 'lodash'
const styles = {
	errorStyle: {
		color: colors.red600
	},
}

class Register extends React.Component {
	state = {
		stepIndex: 0,
		resendLabel: '发送',
		type: '', // personal | company
		sheng: [],
		di: [],
		xian: [],
		selectedSheng: '',
		selectedDi: '',
		selectedXian: '',
		registerEntity: {
			mail: '',
			salt: '',
			code: '',
			password: '',
			repassword: '',
			username: '',
			realname: '',
			detailAddress: '',
			type: ''
		},
		registerInputError: {
			mail: '',
			password: '',
			code: '',
			repassword: '',
			sheng: '',
			di: '',
			xian: '',
			detailAddress: ''
		}
	}

	componentWillMount() {
		this._getShengList()
	}

	/**
	 * 处理下一步
	 * @private
	 */
	_handleNext = () => {
		const {stepIndex, registerInputError, registerEntity, selectedSheng, selectedDi, selectedXian} = this.state
		const {registerPersonal} = this.props.actions

		// 第一步中所有项目填写完整后才能进入下一步
		if (stepIndex == 0) {
			const error = {}
			if (!registerEntity.mail) {
				error['mail'] = '邮箱不能为空'
			}
			if (!registerEntity.code) {
				error['code'] = '验证码不能为空'
			}
			if (!registerEntity.password) {
				error['password'] = '密码不能为空'
			}
			if (!registerEntity.repassword) {
				error['repassword'] = '确认密码不能为空'
			}

			this.setState({
				registerInputError: {
					...registerInputError,
					...error
				}
			})

			// 判断是否有错
			if(_.size(error)) {
				return
			}
		}else if(stepIndex == 1){
			if (registerEntity.type = '') {
				this.setState({
					registerEntity: {
						...registerEntity,
						type: 'customer' // 默认为个人注册
					}
				})
			}
		}
		else if (stepIndex == 2) {
			const error = {}
			if (!registerEntity.username) {
				error['username'] = '用户名不能为空'
			}
			if (!registerEntity.realname) {
				error['realname'] = '姓名不能为空'
			}
			if (!registerEntity.detailAddress) {
				error['detailAddress'] = '详细地址不能为空'
			}
			if (!selectedSheng) {
				error['sheng'] = '请选择省'
			}
			if (!selectedDi) {
				error['di'] = '请选择市'
			}
			if (!selectedXian) {
				error['xian'] = '请选择县'
			}

			this.setState({
				registerInputError: {
					...registerInputError,
					...error
				}
			})

			// 判断是否有错
			if(_.size(error)) {
				return
			} else{
				// 提交注册
				const {mail, salt, code, username, password, realname, detailAddress, type} = registerEntity
				const address = `${selectedSheng}${selectedDi}${selectedXian}${detailAddress}`
				if(type == 'customer') {
					// 个人注册
					registerPersonal({
						mail,
						salt,
						code,
						username,
						password,
						realname,
						address
					}).then((res) => {
						Alert.success("注册成功")
						this.setState({
							stepIndex: 3,
						})
					}).catch((err) => {
						Alert.error('验证码出错')
						console.log(err)
						this.setState({
							stepIndex: 2,
						})
					})
				}
			}
		}

		if (stepIndex == 3) {
			browserHistory.push('/')
		}

		this.setState({
			stepIndex: stepIndex < 2 ? stepIndex + 1 : stepIndex,
		})


	}

	/**
	 * 处理上一步
	 * @private
	 */
	_handlePrev = () => {
		const {stepIndex} = this.state
		if(stepIndex > 0) {
			this.setState({
				stepIndex: stepIndex - 1
			})
		}
	}

	/**
	 * 处理输入框的变动
	 * @param key
	 * @param e
	 * @private
	 */
	_handleInputChange = (key, e) => {
		this.setState({
			registerEntity: {
				...this.state.registerEntity,
				[key]: e.target.value
			},
			registerInputError: {}
		})

	}

	_handleTypeClick = (type) => {
		this.setState({
			registerEntity: {
				...this.state.registerEntity,
				type
			}
		})
		this._handleNext()
	}

	/**
	 * 处理邮件验证码的重新发送
	 * @private
	 */
	_handleResendEmail = () => {
		const {resendLabel, registerEntity, registerInputError} = this.state
		const {sendValidationMail} = this.props.actions
		// 处理邮箱地址是否正确
		if (!registerEntity.mail || !/^[a-z_0-9.-]{1,64}@([a-z0-9-]{1,200}.){1,5}[a-z]{1,6}$/.test(registerEntity.mail)) {
			this.setState({
				registerInputError: {
					...registerInputError,
					mail: "请正确填写您的邮箱地址"
				}
			})
			return
		} else{
			this.setState({
				registerInputError: {
					...registerInputError,
					mail: ''
				}

			})
		}
		if(resendLabel != '发送') return

		sendValidationMail({mail: registerEntity.mail, salt:Math.random().toString(36).substr(2)}).then((res) => {
			this.setState({
				registerEntity: {
					...registerEntity,
					salt: res.value
				}
			})

			Alert.success("验证码下发成功,请检查您的邮箱")
		}).catch((err) => {
			Alert.error("验证码下发失败,请检查")
		})

		let seconds = 60
		let timer = setInterval(() => {
			this.setState({
				resendLabel: `${--seconds}s`
			})
		}, 1000)
		setTimeout(() => {
			clearInterval(timer)
			this.setState({
				resendLabel: '发送'
			})
		}, 60 * 1000)
	}

	/**
	 * 处理确认密码的验证
	 * @param e
	 * @private
	 */
	_handleRepasswordVerify = (e) => {
		const {registerEntity, registerInputError} = this.state
		const {password} = registerEntity
		if (e.target.value != password) {
			this.setState({
				registerInputError: {
					...registerInputError,
					repassword: '两次输入的密码不一样,请检查'
				}
			})
		}else {
			this.setState({
				registerInputError: {
					...registerInputError,
					repassword: ''
				}
			})
		}
	}


	_handleAddressChange = (key, event, index, value) => {
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
	 * 渲染步骤内容
	 * @param stepIndex
	 * @returns {*}
	 * @private
	 */
	_renderStepContent = (stepIndex) => {
		const {resendLabel, registerInputError} = this.state

		switch (stepIndex) {
			case 0:
				return (
					<div style={{width: 256}} >
						<TextField
							style={{width: '100%'}}
							hintText="请输入您的邮箱"
							floatingLabelText="邮箱"
							errorText={registerInputError.mail}
							errorStyle={styles.errorStyle}
						  onChange={this._handleInputChange.bind(this, 'mail')}
						/><br />
						<div style={{width: '100%',display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
							<TextField
								hintText="邮箱中的验证码"
								floatingLabelText="验证码"
								onChange={this._handleInputChange.bind(this, 'code')}
							  style={{marginRight: 10}}
								errorText={registerInputError.code}
								errorStyle={styles.errorStyle}
							/>
							<RaisedButton
								label={resendLabel}
								disabled={resendLabel != '发送'}
								onTouchTap={this._handleResendEmail}
								primary={true}
							/>
						</div>
						<br />
						<TextField
							style={{width: '100%', marginTop: -20}}
							type="password"
						  hintText="请输入您的密码"
						  floatingLabelText="密码"
							errorText={registerInputError.password}
							errorStyle={styles.errorStyle}
						  onChange={this._handleInputChange.bind(this, 'password')}
						/><br/>
						<TextField
							type="password"
							style={{width: '100%'}}
						  hintText="请再次输入您的密码"
						  floatingLabelText="确认密码"
							errorText={registerInputError.repassword}
							errorStyle={styles.errorStyle}
							onChange={this._handleInputChange.bind(this, 'repassword')}
						  onBlur={this._handleRepasswordVerify.bind(this)}
						/>

					</div>
				)
			case 1:
				return (
					<div>
						<FlatButton style={{textAlign: 'left', height: 'auto', width: 200, borderRadius: 5, boxShadow: `2px 2px 10px 4px ${colors.grey300}`, overflow: 'hidden'}} onTouchTap={this._handleTypeClick.bind(this, 'customer')} icon={
							<div>
								<div style={{background: colors.orangeA200, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '5px 0'}}>
									<div style={{background: colors.orangeA100, width: 40, height: 40, borderRadius: 20, display: 'flex', justifyContent: 'center'}}>
										<img style={{width: 25, height: 25, alignSelf: 'center' }} src={require('../../images/front/register/register_personal.png')} alt=""/>
									</div>
									<span style={{marginLeft: 15, color: 'white', fontSize: 20}}>个人认证</span>
								</div>
								<ul style={{marginLeft: -10, marginTop: 20, paddingRight: 10}}>
									<li style={{color: colors.grey500, listStyleType: 'disc'}}>个体用户仅能购买5个以内的商品;</li>
									<li style={{color: colors.grey500, listStyleType: 'disc', marginTop: 15}}>提供现货并附赠启动装置、说明书等;</li>
									<li style={{color: colors.grey500, listStyleType: 'disc', marginTop: 15}}>运送方式为快递、免邮、不开票</li>
								</ul>
							</div>
						}>
						</FlatButton>
						<FlatButton style={{marginLeft: 50, textAlign: 'left', height: 'auto', width: 200, borderRadius: 5, boxShadow: `2px 2px 10px 4px ${colors.grey300}`, overflow: 'hidden'}} onTouchTap={this._handleNext} icon={
							<div>
								<div style={{background: colors.lightBlueA200, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '5px 0'}}>
									<div style={{background: colors.lightBlueA100, width: 40, height: 40, borderRadius: 20, display: 'flex', justifyContent: 'center'}}>
										<img style={{width: 25, height: 25, alignSelf: 'center' }} src={require('../../images/front/register/register_company.png')} alt=""/>
									</div>
									<span style={{marginLeft: 15, color: 'white', fontSize: 20}}>企业认证</span>
								</div>
								<ul style={{marginLeft: -10, marginTop: 20, paddingRight: 10}}>
									<li style={{color: colors.grey500, listStyleType: 'disc'}}>个体用户仅能购买5个以内的商品;</li>
									<li style={{color: colors.grey500, listStyleType: 'disc', marginTop: 15}}>提供现货并附赠启动装置、说明书等;</li>
									<li style={{color: colors.grey500, listStyleType: 'disc', marginTop: 15}}>运送方式为快递、免邮、不开票</li>
								</ul>
							</div>
						}>
						</FlatButton>
					</div>
				)
			case 2:
				return (
					<div style={{width: 400}}>
						<TextField
							style={{width: '100%'}}
							hintText="请输入您的用户名"
							floatingLabelText="用户名"
							errorText={registerInputError.username}
							errorStyle={styles.errorStyle}
							onChange={this._handleInputChange.bind(this, 'username')}
						/><br />
						<TextField
							style={{width: '100%'}}
							hintText="请输入您的姓名"
							floatingLabelText="姓名"
							errorText={registerInputError.realname}
							errorStyle={styles.errorStyle}
							onChange={this._handleInputChange.bind(this, 'realname')}

						/><br />
							<SelectField
								style={{width: '100%'}}
								floatingLabelText="地址"
								floatingLabelFixed={true}
								hintText="省"
								value={this.state.selectedSheng}
								errorText={registerInputError.sheng}
								errorStyle={styles.errorStyle}
								onChange={this._handleAddressChange.bind(this, 'selectedSheng')}
							>
								{this.state.sheng}
							</SelectField>
							<SelectField
								style={{width: '100%'}}
								floatingLabelText="市"
								errorText={registerInputError.di}
								errorStyle={styles.errorStyle}
							  value={this.state.selectedDi}
							  onChange={this._handleAddressChange.bind(this, 'selectedDi')}
							>
								{this.state.di}
							</SelectField>
							<SelectField
								style={{width: '100%'}}
								floatingLabelText="县"
								errorText={registerInputError.xian}
								errorStyle={styles.errorStyle}
							  value={this.state.selectedXian}
							  onChange={this._handleAddressChange.bind(this, 'selectedXian')}
							>
								{this.state.xian}
							</SelectField>
						<TextField
							style={{width: '100%', marginTop: -10}}
							hintText="请输入您的详细地址"
							floatingLabelText="详细地址"
							errorText={registerInputError.detailAddress}
							errorStyle={styles.errorStyle}
							onChange={this._handleInputChange.bind(this, 'detailAddress')}
						/>
					</div>
				)
			case 3:
				return (
					<div style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
						margin: '100px 0'
					}}>
						<div>
							<CheckCircle style={{width: 100, height: 100, color: colors.green500}}/>
						</div>
						<div style={{marginLeft: 20}}>
							<h1>恭喜您,注册成功</h1>
							<p>您的绑定邮箱账号为: {this.state.registerEntity.mail}</p>
						</div>
					</div>
				)
		}
	}

	render() {
		const {stepIndex} = this.state
		return (
			<Box title="注册青霜科技ID" style={{width: '60%', margin: '50px auto', minWidth: 700}}>
				<div style={{width: '100%', margin: 'auto'}}>
					<Stepper activeStep={stepIndex}>
						<Step>
							<StepLabel>第一步: 基本信息</StepLabel>
						</Step>
						<Step>
							<StepLabel>第二步: 选择身份</StepLabel>
						</Step>
						<Step>
							<StepLabel>第三步: 完善信息</StepLabel>
						</Step>
						<Step>
							<StepLabel>第四步: 注册成功</StepLabel>
						</Step>
					</Stepper>
					<div style={{padding: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
						{this._renderStepContent(stepIndex)}
					</div>
					<div style={{
						margin: '12px 0',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center'
					}}>
						<FlatButton
							label="上一步"
							disabled={stepIndex === 0}
							onTouchTap={this._handlePrev}
							style={{marginRight: 12}}
						/>
						<RaisedButton
							label={stepIndex === 3 ? '返回首页' : (stepIndex === 2 ? '提交' : '下一步')}
							primary={true}
							onTouchTap={this._handleNext}
						/>
					</div>
				</div>
			</Box>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register)
