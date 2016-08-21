/**
 * Created by zhangjiasheng on 16/8/19.
 */
import React from 'react'
import Radium from 'radium'
import * as colors from 'material-ui/styles/colors'

const styles = {
	container: {
		// background: 'red'
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		border: `1px solid ${colors.grey300}`,
		boxShadow: `2px 2px 10px 4px ${colors.grey300}`,
		borderRadius: '10px',
		overflow: 'hidden'
	},
	title: {
		fontSize: '1.5rem',
		background: `linear-gradient(to bottom, ${colors.white}, ${colors.grey100})`,
		padding: '1.5em 1em',
		color: colors.grey600,
		height: 36,
		lineHeight: 36,
		borderBottom : `1px solid ${colors.grey300}`,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	}

}


class Box extends React.Component {

	static props = {
		title: React.PropTypes.string.isRequired,
		style: React.PropTypes.object,
		menu: React.PropTypes.node
	}

	static defaultProps = {
		title: '未知'
	}

	render() {
		return(
			<div style={[styles.container,this.props.style]}>
				<div style={styles.title}>{this.props.title}{this.props.menu}</div>
				{this.props.children}
			</div>
		)
	}
}


export default Radium(Box)