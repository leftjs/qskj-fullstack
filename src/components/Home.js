/**
 * Created by zhangjiasheng on 7/23/16.
 */
import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions'
class Home extends React.Component{

	state = {
		height: 0
	}

	componentDidMount() {
		this.setState({
			height: window.innerHeight - 101
		})
	}
	render() {

		return (
			<div className="content-wrapper" style={{minHeight: this.state.height}}>
				<section className="content-header">
					<h1>
						主页
						<small>Optional description</small>
					</h1>
					<ol className="breadcrumb">
						<li><a href="#"><i className="fa fa-dashboard" /> Level</a></li>
						<li className="active">Here</li>
					</ol>
				</section>
				<section className="content">
				</section>
			</div>
		)
	}
}

function mapStateToProps(state) {
	/* Populated by react-webpack-redux:reducer */
	const props = {};
	return props;
}
function mapDispatchToProps(dispatch) {
	/* Populated by react-webpack-redux:action */
	return {
		actions: {...bindActionCreators(actions, dispatch)}
	}


}
export default connect(mapStateToProps, mapDispatchToProps)(Home);