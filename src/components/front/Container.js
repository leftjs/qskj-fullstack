/**
 * Created by zhangjiasheng on 16/8/13.
 */

import React from 'react'
import Radium, {StyleRoot} from 'radium'
import _ from 'lodash'
import {FlatButton} from 'material-ui'
import * as colors from 'material-ui/styles/colors'
import logo from '../../images/front/logo.png'
import SearchSvgIcon from 'material-ui/svg-icons/action/search'
import ShoppingCarSvgIcon from 'material-ui/svg-icons/action/shopping-cart'
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
						<FlatButton icon={<SearchSvgIcon color={styles.labelActive.color} />}/>
						<FlatButton icon={<ShoppingCarSvgIcon color={styles.labelActive.color}/>}/>
					</div>
				</div>
				{this.props.children}
			</div>
		)
	}
}

export default Radium(Container)