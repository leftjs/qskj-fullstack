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
		top: 0,
		justifyContent:'space-around',
		boxShadow: " 2px 2px 4px 1px rgba(0, 0, 0, .3)",
		position: 'fixed',
		zIndex:10000
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
	body: {
		marginTop: 100
	}
}

class Container extends React.Component {
	render() {
		return (
			<div >
				<div style={[styles.verticalCenter, styles.nav]}>
					<div style={styles.verticalCenter}>
						<img src={logo} alt="logo" style={styles.logo}/>
						<FlatButton label="启动系统" labelStyle={styles.labelActive}/>
						<FlatButton label="官方论坛" labelStyle={styles.labelNoActive}/>
						<FlatButton label="黑科技NEWS" labelStyle={styles.labelNoActive}/>
					</div>
					<div>
						<FlatButton icon={<SearchSvgIcon color={styles.labelActive.color} />}/>
						<FlatButton icon={<ShoppingCarSvgIcon color={styles.labelActive.color}/>}/>
					</div>
				</div>
				<div style={styles.body}>
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default Radium(Container)