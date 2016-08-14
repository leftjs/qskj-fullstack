/**
 * Created by zhangjiasheng on 16/8/13.
 */
import React from 'react'
import Container from './Container'

class Main extends React.Component{
	render(){
		return (
			<Container>
				{this.props.children}
			</Container>
		)
	}
}

export default Main