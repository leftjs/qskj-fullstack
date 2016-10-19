/**
 * Created by zhangjiasheng on 16/8/21.
 */
import React from 'react'
import Radium from 'radium'
import {browserHistory} from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';



class Paid extends React.Component {
	render() {
		return (
			<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
				<p></p>
				<img  style={{width: 300}} src={require('../../images/front/paid/wechat.jpg')} alt=""/>
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
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(Radium(Paid))

