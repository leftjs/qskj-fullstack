/**
 * Created by zhangjiasheng on 16/8/13.
 */
import React from 'react'
import Container from './Container'
import { RouteTransition } from 'react-router-transition';

class Main extends React.Component{
	render(){
		return (
		<div>
			<RouteTransition
				pathname={this.props.location.pathname}
				atEnter={{ opacity: 0 }}
				atLeave={{ opacity: 0 }}
				atActive={{ opacity: 1 }}
			>
				<Container>
					{this.props.children}
				</Container>
			</RouteTransition>
		</div>

		)
	}
}

export default Main