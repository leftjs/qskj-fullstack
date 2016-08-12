require('normalize.css/normalize.css');
require('styles/App.css');
import 'react-bootstrap-table/css/react-bootstrap-table-all.min.css'
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import React from 'react';
import _ from 'lodash'
import {browserHistory} from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions'
import Alert from 'react-s-alert'


class Container extends React.Component {
	static propTypes = {
		userIcon: React.PropTypes.string,
		menus: React.PropTypes.object
	}
	static defaultProps = {
		userIcon: require('../images/img/user2-160x160.jpg'),
		menus: {}
	}
	state = {
		selectedMenu: 'home'
	}


	componentWillMount = () => {
		this.props.actions.getProductByPageAndSize({page: 1, size: 2})
	}


  _renderMenus = (menus) => {

	  let renderArr = []
	  _.map(menus, (arr, key) => {
	  	renderArr.push(<li className="header" key={key}>{key}</li>)
		  _.map(arr, (value) => {
		  	const handleMenuClick = () => {
		  		browserHistory.push(`/admin${value.path}`)
		  		this.setState({
		  			selectedMenu: value.name,
				  })
			  }
		  	renderArr.push(<li key={value.name} className={this.state.selectedMenu === value.name ? 'active' : ''} onClick={handleMenuClick}><a><i className={"fa " + `fa-${value.icon}`} ></i><span>{value.value}</span></a></li>)
		  })
	  })
	  return renderArr
  }

  render() {
    return (
	    <div className="wrapper">

		    <Alert stack={{limit: 3}} html={true} timeout={2000} offset={0} position='bottom-right' effect="slide"/>
		    {/* Main Header */}
		    <header className="main-header">
			    {/* Logo */}
			    <a href="/" className="logo">
				    {/* mini logo for sidebar mini 50x50 pixels */}
				    <span className="logo-mini"><b>青</b>霜</span>
				    {/* logo for regular state and mobile devices */}
				    <span className="logo-lg"><b>青霜</b>科技</span>
			    </a>
			    {/* Header Navbar */}
			    <nav className="navbar navbar-static-top" role="navigation">
				    {/* Sidebar toggle button*/}
				    <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
					    <span className="sr-only">Toggle navigation</span>
				    </a>
				    {/* Navbar Right Menu */}
				    <div className="navbar-custom-menu">
					    <ul className="nav navbar-nav">
						    {/* Messages: style can be found in dropdown.less*/}
						    <li className="dropdown messages-menu">
							    {/* Menu toggle button */}
							    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
								    <i className="fa fa-envelope-o" />
								    <span className="label label-success">4</span>
							    </a>
							    <ul className="dropdown-menu">
								    <li className="header">You have 4 messages</li>
								    <li>
									    {/* inner menu: contains the messages */}
									    <ul className="menu">
										    <li>{/* start message */}
											    <a href="#">
												    <div className="pull-left">
													    {/* User Image */}
													    <img src={this.props.userIcon} className="img-circle" alt="User Image" />
												    </div>
												    {/* Message title and timestamp */}
												    <h4>
													    Support Team
													    <small><i className="fa fa-clock-o" /> 5 mins</small>
												    </h4>
												    {/* The message */}
												    <p>Why not buy a new awesome theme?</p>
											    </a>
										    </li>
										    {/* end message */}
									    </ul>
									    {/* /.menu */}
								    </li>
								    <li className="footer"><a href="#">See All Messages</a></li>
							    </ul>
						    </li>
						    {/* /.messages-menu */}
						    {/* Notifications Menu */}
						    <li className="dropdown notifications-menu">
							    {/* Menu toggle button */}
							    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
								    <i className="fa fa-bell-o" />
								    <span className="label label-warning">10</span>
							    </a>
							    <ul className="dropdown-menu">
								    <li className="header">You have 10 notifications</li>
								    <li>
									    {/* Inner Menu: contains the notifications */}
									    <ul className="menu">
										    <li>{/* start notification */}
											    <a href="#">
												    <i className="fa fa-users text-aqua" /> 5 new members joined today
											    </a>
										    </li>
										    {/* end notification */}
									    </ul>
								    </li>
								    <li className="footer"><a href="#">View all</a></li>
							    </ul>
						    </li>
						    {/* Tasks Menu */}
						    <li className="dropdown tasks-menu">
							    {/* Menu Toggle Button */}
							    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
								    <i className="fa fa-flag-o" />
								    <span className="label label-danger">9</span>
							    </a>
							    <ul className="dropdown-menu">
								    <li className="header">You have 9 tasks</li>
								    <li>
									    {/* Inner menu: contains the tasks */}
									    <ul className="menu">
										    <li>{/* Task item */}
											    <a href="#">
												    {/* Task title and progress text */}
												    <h3>
													    Design some buttons
													    <small className="pull-right">20%</small>
												    </h3>
												    {/* The progress bar */}
												    <div className="progress xs">
													    {/* Change the css width attribute to simulate progress */}
													    <div className="progress-bar progress-bar-aqua" style={{width: '20%'}} role="progressbar" aria-valuenow={20} aria-valuemin={0} aria-valuemax={100}>
														    <span className="sr-only">20% Complete</span>
													    </div>
												    </div>
											    </a>
										    </li>
										    {/* end task item */}
									    </ul>
								    </li>
								    <li className="footer">
									    <a href="#">View all tasks</a>
								    </li>
							    </ul>
						    </li>
						    {/* User Account Menu */}
						    <li className="dropdown user user-menu">
							    {/* Menu Toggle Button */}
							    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
								    {/* The user image in the navbar*/}
								    <img src={this.props.userIcon} className="user-image" alt="User Image" />
								    {/* hidden-xs hides the username on small devices so only the image appears. */}
								    <span className="hidden-xs">Alexander Pierce</span>
							    </a>
							    <ul className="dropdown-menu">
								    {/* The user image in the menu */}
								    <li className="user-header">
									    <img src={this.props.userIcon} className="img-circle" alt="User Image" />
									    <p>
										    Alexander Pierce - Web Developer
										    <small>Member since Nov. 2012</small>
									    </p>
								    </li>
								    {/* Menu Body */}
								    <li className="user-body">
									    <div className="row">
										    <div className="col-xs-4 text-center">
											    <a href="#">Followers</a>
										    </div>
										    <div className="col-xs-4 text-center">
											    <a href="#">Sales</a>
										    </div>
										    <div className="col-xs-4 text-center">
											    <a href="#">Friends</a>
										    </div>
									    </div>
									    {/* /.row */}
								    </li>
								    {/* Menu Footer*/}
								    <li className="user-footer">
									    <div className="pull-left">
										    <a href="#" className="btn btn-default btn-flat">Profile</a>
									    </div>
									    <div className="pull-right">
										    <a href="#" className="btn btn-default btn-flat">Sign out</a>
									    </div>
								    </li>
							    </ul>
						    </li>
					    </ul>
				    </div>
			    </nav>
		    </header>



		    {/* Left side column. contains the logo and sidebar */}
		    <aside className="main-sidebar">
			    {/* sidebar: style can be found in sidebar.less */}
			    <section className="sidebar">
				    {/* Sidebar user panel (optional) */}
				    <div className="user-panel">
					    <div className="pull-left image">
						    <img src={this.props.userIcon} className="img-circle" alt="User Image" />
					    </div>
					    <div className="pull-left info">
						    <p>Alexander Pierce</p>
						    {/* Status */}
						    <a href="#"><i className="fa fa-circle text-success" /> Online</a>
					    </div>
				    </div>
				    {/* search form (Optional) */}
				    <form action="#" method="get" className="sidebar-form">
					    <div className="input-group">
						    <input type="text" name="q" className="form-control" placeholder="Search..." />
						    <span className="input-group-btn">
                  <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search" />
                  </button>
                </span>
					    </div>
				    </form>
				    {/* /.search form */}
				    {/* Sidebar Menu */}
				    <ul className="sidebar-menu">
					    {this._renderMenus(this.props.menus)}
				    </ul>
				    {/* /.sidebar-menu */}
			    </section>
			    {/* /.sidebar */}
		    </aside>
		    {/* Content Wrapper. Contains page content */}
		    {this.props.children}
		    {/* /.content-wrapper */}
		    {/* Main Footer */}

		    <footer className="main-footer">
			    {/* To the right */}
			    <div className="pull-right hidden-xs">
				    Anything you want
			    </div>
			    {/* Default to the left */}

			    <strong>Copyright © 2016 <a href="#">Company</a>.</strong> All rights reserved.
		    </footer>
	    </div>
    );
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
export default connect(mapStateToProps, mapDispatchToProps)(Container);


