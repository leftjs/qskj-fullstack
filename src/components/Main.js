
import React from 'react';
import Container from './Container'
import menus from '../config/menus'
let user2 = require('../images/img/user2-160x160.jpg');

class Main extends React.Component {
  render() {
    return (
	    <Container menus={menus.admin}>
		    {this.props.children}
	    </Container>
    );
  }
}


export default Main;
