/**
 * Created by zhangjiasheng on 16/8/13.
 */

import React from 'react'
import Radium, {StyleRoot} from 'radium'
import actions from '../../actions/front'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'lodash'
import {FlatButton} from 'material-ui'
import * as colors from 'material-ui/styles/colors'
import logo from '../../images/front/logo.png'
import PersonSvgIcon from 'material-ui/svg-icons/social/person'
import PersonAddSvgIcon from 'material-ui/svg-icons/social/person-add'
import ClearSvgIcon from 'material-ui/svg-icons/content/clear'
import { browserHistory } from 'react-router'
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import Alert from 'react-s-alert'
const menus = [{
	name: 'starter',
	text: '启动系统'
}, {
	name: 'forum',
	text: '官方论坛'
}, {
	name: 'news',
	text: '黑科技NEWS'
}]

const styles = {
	nav: {
		background: colors.grey50,
		height: 100,
		width: '100%',
		justifyContent:'space-around',
		borderBottom: `1px solid ${colors.grey300}`
	},
	verticalCenter: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	labelActive: {
		color: colors.grey700
	},
	labelNoActive: {
		color: colors.grey400
	},
	logo: {
		// // height:53
		// objectFit: 'fill'
		marginRight: 50
	},
}


class Container extends React.Component {


	componentWillMount() {
		console.log('only once')
		if (this.props.user.token || localStorage.getItem('token') && !this.props.user.info) {
			this.props.actions.loginWithToken(this.props.user.token || localStorage.getItem('token'))
		}
	}
	renderProfiles = () => {
		if (!this.props.user.info) {
			return (
				<div>
					<FlatButton label="注册" onTouchTap={() => {browserHistory.push('register')}} icon={<PersonAddSvgIcon color={styles.labelActive.color}/>}/>
					<FlatButton label="登录" onTouchTap={() => {browserHistory.push('login')}} icon={<PersonSvgIcon color={styles.labelActive.color}/>}/>
				</div>
			)
		}else {
			return (
				<div>
					<FlatButton label="注销" onTouchTap={() => {this.props.actions.logout()}} icon={<ClearSvgIcon color={styles.labelActive.color}/>}/>
					<FlatButton label="个人中心" onTouchTap={() => {browserHistory.push('center')}} icon={<PersonSvgIcon color={styles.labelActive.color}/>}/>
				</div>
			)
		}
	}
	render() {
		return (
			<div >
				<Alert stack={{limit: 3}} html={true} timeout={2000} offset={0} position='bottom-right' effect="slide"/>
				<div style={[styles.verticalCenter, styles.nav]}>
					<div style={styles.verticalCenter}>
						<img src={logo} alt="logo" style={styles.logo}/>
						<FlatButton label="启动系统" labelStyle={styles.labelActive} />
						<FlatButton label="官方论坛" labelStyle={styles.labelNoActive}/>
						<FlatButton label="黑科技NEWS" labelStyle={styles.labelNoActive}/>
					</div>
					<div>
						{this.renderProfiles()}
						</div>
				</div>
				{this.props.children}
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

export default connect(mapStateToProps, mapDispatchToProps)(Radium(Container))