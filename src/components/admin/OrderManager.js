/**
 * Created by zhangjiasheng on 7/23/16.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../../actions'
import Box from './elements/Box'
import {Form, FormControl, Col, ControlLabel, Button, FormGroup} from 'react-bootstrap'
import _ from 'lodash'
import Alert from 'react-s-alert'
import 'react-virtualized/styles.css'
import 'react-select/dist/react-select.css'
import 'react-virtualized-select/styles.css'
import VirtualizedSelect from 'react-virtualized-select'
class OrderManager extends React.Component{

	state = {
		height: 0,
		selectedProduct: 'One',
		productOptions: [],
		selectedUser: 'jason',
		userOptions: []
	}

	componentDidMount() {
		this.setState({
			height: window.innerHeight - 101
		})
	}

	componentWillMount(){

		/**
		 *  获取所有产品
		 */
		this.props.actions.getAllProducts().then((res) => {
			const options = _.map(res.value, (value) => {
				return {
					value: value._id,
					label: value.name
				}})

			this.setState({
				productOptions: options,
				selectedProduct: options[0].value

			})
			Alert.success("获取产品列表成功")
		}).catch((err) => {
			Alert.error("获取产品列表失败")
		})

		/**
		 * 获取所有用户
		 */
		this.props.actions.get_all_users().then((res) => {
			const options = _.map(res.value, (value) => {
				return {
					value: value._id,
					label: `${value.username} ———— ${value.email}`
				}
			})

			this.setState({
				selectedUser: options[0].value,
				userOptions: options
			})

			Alert.success("获取用户列表成功")
		}).catch((err) => {
			Alert.error("获取用户列表失败")
		})
	}


	_handleProductSelectChanged = (e) => {

		this.setState({
			selectedProduct: e.value
		})

		return true

	}

	_handleUserSelectChanged = (e) => {
		this.setState({
			selectedUser: e.value
		})
		return true
	}
	render() {

		return (
			<div className="content-wrapper" style={{minHeight: this.state.height}}>
				<section className="content-header">
					<h1>
						订单管理
						<small>售出的是知识,收获的是财富,宝宝也要成土豪~~</small>
					</h1>
				</section>
				<section className="content">
					<div className="row">
						<div className="col-md-6">
							<Box collapsable={true} removable={true} type="danger" solid={true} title="添加订单" >
								<Form horizontal>
									<FormGroup controlId="nameGroup">
										<Col componentClass={ControlLabel} sm={2}>
											产品
										</Col>
										<Col sm={10}>
											<VirtualizedSelect
												name="product"
												value={this.state.selectedProduct}
												options={this.state.productOptions}
											  onChange={this._handleProductSelectChanged}
											  searchable={true}
											/>

										</Col>
									</FormGroup>

									<FormGroup controlId="orderCountGroup">
										<Col componentClass={ControlLabel} sm={2}>
											数量
										</Col>
										<Col sm={10}>
											<FormControl type="number" placeholder="订购数量" />
										</Col>
									</FormGroup>
									<FormGroup controlId="userGroup">
										<Col componentClass={ControlLabel} sm={2}>
											用户
										</Col>
										<Col sm={10}>
											<VirtualizedSelect
												name="user"
											  value={this.state.selectedUser}
											  options={this.state.userOptions}
											  onChange={this._handleUserSelectChanged}
												searchable={true}
											/>
										</Col>
									</FormGroup>
									<FormGroup>
										<Col smOffset={2} sm={10}>
											<Button type="submit">
												下单
											</Button>
										</Col>
									</FormGroup>
								</Form>
							</Box>
						</div>
					</div>
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
export default connect(mapStateToProps, mapDispatchToProps)(OrderManager);