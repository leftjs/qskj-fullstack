/**
 * Created by zhangjiasheng on 16/8/13.
 */
import React from 'react'
import Radium, {StyleRoot} from 'radium'
import _ from 'lodash'
import {Navbar, NavDropdown, NavItem, MenuItem, Nav} from 'react-bootstrap'


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

class Container extends React.Component {
	render() {
		return (
			<Navbar>
				<Navbar.Header>
					<Navbar.Brand>
						<a href="#">React-Bootstrap</a>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav activeKey={1}>
						<NavItem eventKey={1} href="#">Link</NavItem>
						<NavItem eventKey={2} href="#">Link</NavItem>
						<NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
							<MenuItem eventKey={3.1}>Action</MenuItem>
							<MenuItem eventKey={3.2}>Another action</MenuItem>
							<MenuItem eventKey={3.3}>Something else here</MenuItem>
							<MenuItem divider />
							<MenuItem eventKey={3.3}>Separated link</MenuItem>
						</NavDropdown>
					</Nav>
					<Nav pullRight>
						<NavItem eventKey={1} href="#">Link Right</NavItem>
						<NavItem eventKey={2} href="#">Link Right</NavItem>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		)
	}
}

export default Radium(Container)