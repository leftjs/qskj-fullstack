/**
 * Created by zhangjiasheng on 16/8/13.
 */
import React from 'react'
import actions from '../../actions/front'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {FlatButton,RaisedButton, IconButton} from 'material-ui'
import {browserHistory} from 'react-router'
import * as colors from 'material-ui/styles/colors'


import Radium from 'radium'


const styles = {
	container: {
		background: colors.grey50,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		width: '100%',
		height: 40,
		boxShadow: " 2px 2px 4px 1px rgba(0, 0, 0, .1)",

	},
	addShoppingCar: {
		height: '2rem',
		lineHeight: '2rem',
	},
	buyNow: {
		height: '2rem',
		lineHeight: '2rem',
		marginLeft: 20
	},
	labelActive: {
		color: colors.grey700
	},
	labelNoActive: {
		color: colors.grey400
	},
	body: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%'
	},
	arrow: {
		width: '20%',
		display: 'flex',
		flexDirection:'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	leftContainer: {
		padding: '1em',
		display: 'flex',
		flexDirection: 'column',
		justifyContent:'center',
		alignItems: 'flex-start',
		width: '30%'
	},
	rightContainer: {
		padding: '1em 1em 0',
		display: 'flex',
		flexDirection: 'column',
		justifyContent:'center',
		alignItems: 'center',
		width: '30%'
	},
	productImg: {
		maxWidth: '100%'
	},
	productImg1: {
		marginLeft: '50%',
	},
	productImg2: {
	},
	productImg3: {
		marginLeft: '20%'
	},
	title: {
		fontSize: '5rem',
		color: colors.grey900
	},
	titleBorder: {
		padding: '0 0 5px 0',
		borderBottom: '2px solid ' + colors.lightBlue200
	},
	subtitle: {
		fontSize: '3rem',
		color: colors.grey700
	},
	desc: {
		fontSize: '1.5rem',
		color: colors.grey500
	},
	price: {
		fontSize: '1.8rem',
		color: colors.grey700
	},
	priceNumber: {
		fontSize: '2.5rem',
		color: colors.red400
	}
}
class Home extends React.Component{

	componentWillMount(){
		this.props.actions.login({username: 'as'})
	}

	state = {
		page: 1
	}

	_handlePageDecrease = () => {
		let page = this.state.page
		--page
		this.setState({
			page: page < 1 ? 3 : page
		})
	}

	_handlePageIncrease = () => {
		let page = this.state.page
		++page
		this.setState({
			page: page > 3 ? 1 : page
		})
	}

	_handleBuyClick = () => {
		browserHistory.push('/buy')
	}

	_renderHomeContent = () => {

		let page = this.state.page
		switch (page) {
			case 1:
				return (
					<div style={styles.body}>
						<div style={styles.arrow}>
							<IconButton
								onTouchTap={this._handlePageDecrease.bind(this)}
								style={{
									width: 115,
									height: 115,
									padding: 29
								}}
								iconStyle={{
									width: 57,
									height: 57
								}}>
								<img src={require('../../images/front/home/home_arrow_left.png')} alt=""/>
							</IconButton>
						</div>

						<div style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							width: '60%'
						}}>
							<p style={{
								marginTop: '1em',
								fontSize: '6rem',
								color: colors.darkBlack
							}}>湛泸</p>
							<p style={{
								fontSize: '4rem',
								color: colors.lightBlack
							}}>给您一个全新的开始</p>
							<div
								style={{
								marginTop: '1em',
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center'
							}}>
								<img src={require('../../images/front/home/home_product_4.png')} style={{
									width: '40%'
								}} alt=""/>
								<img src={require('../../images/front/home/home_product_5.png')} style={{
									width: '40%'
								}} alt=""/>
							</div>
						</div>
						<div style={styles.arrow}>
							<IconButton
								onTouchTap={this._handlePageIncrease.bind(this)}
								style={{
									width: 115,
									height: 115,
									padding: 29
								}}
								iconStyle={{
									width: 57,
									height: 57
								}}>
								<img src={require('../../images/front/home/home_arrow_right.png')} alt=""/>
							</IconButton>
						</div>
					</div>
				)
				break
			case 2:
				return (
					<div style={styles.body}>
						<div style={styles.arrow}>
							<IconButton
								onTouchTap={this._handlePageDecrease.bind(this)}
								style={{
									width: 115,
									height: 115,
									padding: 29
								}}
								iconStyle={{
									width: 57,
									height: 57
								}}>
								<img src={require('../../images/front/home/home_arrow_left.png')} alt=""/>
							</IconButton>
						</div>

						<div style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							width: '60%'
						}}>
							<p style={{
								marginTop: '1em',
								fontSize: '6rem',
								color: colors.darkBlack
							}}>湛泸</p>
							<p style={{
								fontSize: '4rem',
								color: colors.lightBlack
							}}>匠心独运,大道至简</p>
							<img style={{
								zIndex: '-100',
								width: '100%',
								marginTop: '20%',
								transform: 'scale(1.67)'
						}} src={require('../../images/front/home/home_product_6.png')} alt=""/>
						</div>

						<div style={styles.arrow}>
							<IconButton
								onTouchTap={this._handlePageIncrease.bind(this)}
								style={{
									width: 115,
									height: 115,
									padding: 29
								}}
								iconStyle={{
									width: 57,
									height: 57
								}}>
								<img src={require('../../images/front/home/home_arrow_right.png')} alt=""/>
							</IconButton>
						</div>
					</div>

				)
				break
			case 3:
				return (
					<div style={styles.body}>
						<div style={styles.arrow}>
							<IconButton
								onTouchTap={this._handlePageDecrease.bind(this)}
								style={{
									width: 115,
									height: 115,
									padding: 29
								}}
								iconStyle={{
									width: 57,
									height: 57
								}}>
								<img src={require('../../images/front/home/home_arrow_left.png')} alt=""/>
							</IconButton>
						</div>
						<div style={styles.leftContainer}>
							<p style={styles.title}><span style={styles.titleBorder}>湛</span>泸</p>
							<p style={styles.subtitle}>匠心独运,大道至简</p>
							<p style={styles.desc}>湛泸启动系统适用于GY6-125款发动机,让您感受"其疾如风,其徐如林,不动如山,动若雷霆"的摩托车驾车体验。彰显自我从起步开始</p>
							<p style={styles.price}><span style={styles.priceNumber}>260</span>元起</p>
						</div>
						<div style={styles.rightContainer}>
							<img src={require('../../images/front/home/home_product_1.png')} style={[styles.productImg, styles.productImg1]} alt=""/>
							<img src={require('../../images/front/home/home_product_2.png')} style={[styles.productImg, styles.productImg2]} alt=""/>
							<img src={require('../../images/front/home/home_product_3.png')} style={[styles.productImg, styles.productImg3]} alt=""/>
						</div>
						<div style={styles.arrow}>
							<IconButton
								onTouchTap={this._handlePageIncrease.bind(this)}
								style={{
									width: 115,
									height: 115,
									padding: 29
								}}
								iconStyle={{
									width: 57,
									height: 57
								}}>
								<img src={require('../../images/front/home/home_arrow_right.png')} alt=""/>
							</IconButton>
						</div>
					</div>
				)
				break
			default:
				break

		}
	}


	render(){
		return (
			<div>
				<div style={styles.container}>
					<div>
						<FlatButton label="概览" style={styles.labelActive}/>
						<FlatButton label="功能" style={styles.labelNoActive}/>
						<FlatButton label="参数" style={styles.labelNoActive}/>
					</div>
					<div>
						<RaisedButton
							style={styles.addShoppingCar}
							backgroundColor={colors.blue500}
							labelColor={colors.white}
							label="加入购物车"
						/>
						<RaisedButton
							style={styles.buyNow}
							backgroundColor={colors.orangeA200}
							labelColor={colors.white}
							label="立即购买"
						  onClick={this._handleBuyClick}
						/>
					</div>
				</div>
				{
					this._renderHomeContent()
				}
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
		actions: {...bindActionCreators(actions, dispatch)}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Radium(Home));