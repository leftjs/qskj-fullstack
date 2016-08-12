/**
 * Created by zhangjiasheng on 7/24/16.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../../actions'
import Box from './elements/Box'
import _ from 'lodash'
import {Form, ValidatedInput, Radio, RadioGroup, FileValidator} from 'react-bootstrap-validation'
import {Button, Modal, Carousel, Media, Col, ButtonGroup} from 'react-bootstrap'
import Alert from 'react-s-alert'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'


class UserManager extends React.Component {


	state = {
		height: 0,
		image: '',
		data: [],
		sizePerPage: 10,
		currentPage: 1,
		totalDataSize: 0,
		prepareValidateData: [],
		sizePerPage2: 10,
		currentPage2: 1,
		totalDataSize2: 0,
		prepareValidateSelections: []
	}

	componentDidMount() {
		this.setState({
			height: window.innerHeight - 101
		})
	}

	_handleUserAdd = (e) => {
		this.props.actions.add_user(e).then((res) => {
			this._form.refs.form.reset()
			this._updateUsersList()
			this._updatePrepareList()
			Alert.success("新用户添加成功")
		}).catch((err) => {
			Alert.error("用户添加失败")
		})
	}


	_handleUserDelete = (e) => {
		_.map(e, (value) => {
			this.props.actions.delete_user_by_id({id: value}).then((res) => {
				Alert.success("用户删除成功")
				this._updateUsersList()
				this._updatePrepareList()
			}).catch((err) => {
				Alert.error("用户删除失败")
			})
		})
	}

	_handleUserUpdate = (e) => {
		this.props.actions.add_user(e).then((res) => {
			Alert.success("更新成功")
		}).catch((err) => {
			Alert.error("更新失败")
		})
	}

	_handleValidate =(e) => {

		_.map(this.state.prepareValidateSelections, (value) => {
			this.props.actions.validate_user_by_id({id: value}).then((res) => {
				Alert.success(`用户: ${value} 审批成功`)
				this.state.prepareValidateSelections = []
				this._updatePrepareList()
				this._updateUsersList()
			}).catch((err) => {
				Alert.error(`用户: ${value} 审批失败`)
			})
		})
	}
	_handleValidateSelected = (row, isSelected, event) => {

		if (isSelected) {
			this.state.prepareValidateSelections.push(row._id)
			this.state.prepareValidateSelections = _.uniq(this.state.prepareValidateSelections)
		}else {
			_.remove(this.state.prepareValidateSelections, (value) => {
				return value == row._id
			})
		}
		console.log(this.state.prepareValidateSelections)
		return true
	}

	_handleValidateSelectedAll = (isSelected, currentSelectedAndDisplayData) => {

		if (isSelected) {
			this.state.prepareValidateSelections = this.state.prepareValidateSelections.concat(_.map(currentSelectedAndDisplayData, (value) => {
				return value._id
			}))
		}else {
			_.forEach(_.map(currentSelectedAndDisplayData, (value) => {
				return value._id
			}), (value) => {
				_.remove(this.state.prepareValidateSelections, (value2) => {
					return value2 == value
				})
			})
		}
		console.log(this.state.prepareValidateSelections)
		return true
	}

	_handlePageAndSizeChange = (page, size) => {
		this.props.actions.get_user_by_page_and_size({page,size, validated: true}).then(this._handleNewData).catch((err) => {
			Alert.error("获取成熟用户资料列表: error")
		})
	}
	_handlePageAndSizeChange2 = (page, size) => {
		this.props.actions.get_user_by_page_and_size({page,size, validated: false}).then(this._handleNewData2).catch((err) => {
			Alert.error("获取待审批的新用户列表: error")
		})
	}
	componentWillMount () {
		this._updateUsersList()
		this._updatePrepareList()
	}

	_updateUsersList = () => {
		this.props.actions.get_user_by_page_and_size({page: this.state.currentPage, size: this.state.sizePerPage,validated: true}).then(this._handleNewData).catch((err) => {
			Alert.error("获取成熟用户资料列表: error")
		})
	}

	_updatePrepareList = () => {
		this.props.actions.get_user_by_page_and_size({page: this.state.currentPage2, size: this.state.sizePerPage2,validated: false}).then(this._handleNewData2).catch((err) => {
			Alert.error("获取待审批的新用户列表: error")
		})

	}

	_handleNewData =(res) => {

		this.setState({
			data: res.value.data,
			sizePerPage: res.value.sizePerPage,
			currentPage: res.value.currentPage,
			totalDataSize: res.value.totalDataSize
		})
		Alert.info("获取成熟用户资料列表: ok")
	}

	_handleNewData2 =(res) => {

		this.setState({
			prepareValidateData: res.value.data,
			sizePerPage2: res.value.sizePerPage,
			currentPage2: res.value.currentPage,
			totalDataSize2: res.value.totalDataSize
		})
		Alert.info("获取待审批的新用户列表: ok")
	}

	render(){
		return (
			<div className="content-wrapper" style={{minHeight: this.state.height}}>
				<section className="content-header">
					<h1>
						用户管理
						<small>杜绝不三不四,从用户管理做起~~~~</small>
					</h1>
				</section>
				<section className="content">
					<Box collapsable={true} removable={true} solid={true} type="info" title="成熟用户资料管理" loading={this.props.delete_user_by_id_loading}>
						<BootstrapTable data={this.state.data}
						                striped={true}
						                hover={true} remote={true}
						                condensed={true} pagination={true} ref={(view) => {this._table = view}}
						                fetchInfo={ {dataTotalSize: this.state.totalDataSize}}
						                deleteRow={true}
						                selectRow={{mode: 'checkbox'}}
						                cellEdit={{
						                	mode: 'dbclick',
						                	blurToSave: true,
						                	beforeSaveCell: this._handleUserUpdate
						                }}
						                options={{
						                	onDeleteRow: this._handleUserDelete,
															sizePerPage: this.state.sizePerPage,
															onPageChange: this._handlePageAndSizeChange,
															sizePerPageList: [10,20,30,50],
															pageStartIndex: 1,
															page: this.state.currentPage,
						}}>
							<TableHeaderColumn isKey={true} dataField="_id"  dataAlign="center">用户编号</TableHeaderColumn>
							<TableHeaderColumn dataField="username" dataAlign="center" >用户名</TableHeaderColumn>
							<TableHeaderColumn dataField="password" dataAlign="center">密码</TableHeaderColumn>
							<TableHeaderColumn dataField="email" dataAlign="center" >邮箱</TableHeaderColumn>
						</BootstrapTable>
					</Box>
					<Box collapsable={true} removable={true} solid={true} type="success" title="新用户审批" loading={this.props.validate_user_by_id_loading}>
						<ButtonGroup bsSize="small" style={{
							marginLeft: 10
						}}>
							<Button bsStyle="info" className="react-bs-table-del-btn" onClick={this._handleValidate}><i className="glyphicon glyphicon-check"></i>审批</Button>
						</ButtonGroup>

						<BootstrapTable data={this.state.prepareValidateData}
						                striped={true}
						                hover={true} remote={true}
						                condensed={true} pagination={true} ref={(view) => {this._table = view}}
						                fetchInfo={ {dataTotalSize: this.state.totalDataSize2}}
						                selectRow={{
						                	mode: 'checkbox',
						                	onSelect: this._handleValidateSelected,
						                	onSelectAll: this._handleValidateSelectedAll
						                }}
						                options={{

						                	onDeleteRow: this._handleValidate,
															sizePerPage: this.state.sizePerPage2,
															onPageChange: this._handlePageAndSizeChange2,
															sizePerPageList: [10,20,30,50],
															pageStartIndex: 1,
															page: this.state.currentPage2,
						}}>
							<TableHeaderColumn isKey={true} dataField="_id"  dataAlign="center">用户编号</TableHeaderColumn>
							<TableHeaderColumn dataField="username" dataAlign="center" >用户名</TableHeaderColumn>
							<TableHeaderColumn dataField="password" dataAlign="center">密码</TableHeaderColumn>
							<TableHeaderColumn dataField="email" dataAlign="center" >邮箱</TableHeaderColumn>
						</BootstrapTable>
					</Box>
					<Col>
						<div className="row">
							<div className="col-md-6">
								<Box collapsable={true} removable={true} solid={true} type="warning" title="添加用户" loading={this.props.add_user_loading}>
									<Form onValidSubmit={this._handleUserAdd} ref={(view) => this._form=view} model={this.state.model}>
										<ValidatedInput
											ref={(view) => {
									this._nameInput = view
								}}
											type='text'
											label='用户名'
											// Each input that you need validated should have
											// the "name" prop
											name='username'
											// Validation rules separated with comma
											validate='required,isLength:6:25'
											// Error messages for each error type
											errorHelp={{
                        required: '请输入用户名',
                        isLength: '长度在6-25之间'
                    }}
										/>

										<ValidatedInput
											type='password'
											label='密码'
											// Each input that you need validated should have
											// the "name" prop
											name='password'
											// Validation rules separated with comma
											validate='required,isLength:6:25'
											// Error messages for each error type
											errorHelp={{
                        required: '请输入产品名称',
                        isLength: '长度在6-25之间'
                    }}
										/>
										<ValidatedInput
											type='email'
											label='邮箱'
											// Each input that you need validated should have
											// the "name" prop
											name='email'
											// Validation rules separated with comma
											validate='required,isEmail'
											// Error messages for each error type
											errorHelp={{
                        required: '请输入邮箱地址',
                        isEmail: '邮箱地址不正确,请输入正确的邮箱地址'
                    }}
										/>

										<Button type="submit" bsSize="small" bsStyle="warning" >添加</Button>
									</Form>

								</Box>
							</div>
						</div>
					</Col>
				</section>
			</div>
		)
	}
}





function mapStateToProps(state) {
	/* Populated by react-webpack-redux:reducer */
	const {delete_user_by_id_loading, validate_user_by_id_loading, add_user_loading} = state.user
	const props = {
		delete_user_by_id_loading,
		validate_user_by_id_loading,
		add_user_loading
	};
	return props;
}
function mapDispatchToProps(dispatch) {
	/* Populated by react-webpack-redux:action */
	return {
		actions: {...bindActionCreators(actions, dispatch)}
	}


}
export default connect(mapStateToProps, mapDispatchToProps)(UserManager);