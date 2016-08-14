/**
 * Created by zhangjiasheng on 16/8/13.
 */
import React from 'react'
import actions from '../../actions/front'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
class Home extends React.Component{

	componentWillMount(){
		this.props.actions.login({username: 'as'})
	}


	render(){
		return (
			<div></div>

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
export default connect(mapStateToProps, mapDispatchToProps)(Home);