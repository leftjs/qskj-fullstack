/**
 * Created by zhangjiasheng on 7/23/16.
 */
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import actions from '../../actions/admin'
import Box from './elements/Box'
import {FormControl, Col, ControlLabel, Button, FormGroup} from 'react-bootstrap'
import {Form, ValidatedInput} from 'react-bootstrap-validation'
import _ from 'lodash'
import Alert from 'react-s-alert'
import config from '../../config/index'
import {TableHeaderColumn, BootstrapTable} from 'react-bootstrap-table'

// 引入dropzone和css
import DropzoneComponent from 'react-dropzone-component'
import 'react-dropzone-component/styles/filepicker.css'
import 'dropzone/dist/min/dropzone.min.css'

const componentConfig = {
	iconFiletypes: ['.jpg', '.png', '.gif'],
	showFiletypeIcon: true,
	postUrl: `${config.domain}/upload/single`
}

const djsConfig = {

	addRemoveLinks: true,
	params: {
		myParameter: "I'm a parameter!"
	}
}

class SupplierManager extends React.Component {

	state = {
		height: 0,
		formImages: [], // 表单中的图片地址
		model: {
			name: null,
			phone: null,
			email: null
		},
		sizePerPage: 10,
		currentPage: 1,
		totalDataSize: 0,
		data: []

	}

	eventHandlers = {
		init: (dropzone) => {
			this._dropzone = dropzone
		},
		success: (e) => {
			this.state.formImages.push(JSON.parse(e.xhr.response))
			this.state.formImages = _.uniq(this.state.formImages)
		},
		removedfile: (e) => {
			_.remove(this.state.formImages, (value) => {
				return value == JSON.parse(e.xhr.response)
			})
		}
	}

	_handleSupplierAdd = (e) => {

		this.props.actions.add_supplier({...e, competency: this.state.formImages}).then((res) => {
			this._form.refs.form.reset()
			this._dropzone.removeAllFiles()
			this._fetchSupplierList()
			Alert.success('供应商添加成功')
		}).catch((err) => {
			console.log(err)
			Alert.error("供应商添加失败")
		})
	}

	_fetchSupplierList = (page,size) => {
		this.props.actions.get_suppliers_by_page_and_size({
			page: !!page ? page : this.state.currentPage,
			size: !!size ? size: this.state.sizePerPage
		}).then((res) => {
			console.log('res', res)
			this.setState(res.value)
			Alert.success("获取供应商列表成功")
		}).catch((err) => {
			Alert.error("获取供应商列表失败")
		})
	}

	_handlePageAndSizeChange = (page,size) => {
		this._fetchSupplierList(page,size)
	}

	_handleSupplierDelete = (e) => {
		_.forEach(e, (item) => {
			this.props.actions.delete_supplier_by_id(item).then((res) => {
				Alert.success(`编号: ${item} 的供应商删除成功`)
				this._fetchSupplierList()
			}).catch((err) => {
				Alert.error(`编号: ${item} 的供应商删除失败`)
			})
		})
	}
	componentDidMount() {
		this.setState({
			height: window.innerHeight - 101
		})
	}

	componentWillMount() {

		this._fetchSupplierList(this.state.currentPage, this.state.sizePerPage)

	}

	render() {

		return (
			<div className="content-wrapper" style={{minHeight: this.state.height}}>
				<section className="content-header">
					<h1>
						供应商管理
						<small>有钱大家一起赚,宝宝不走垄断独裁路~~</small>
					</h1>
				</section>
				<section className="content">
					<div className="row">
						<div className="col-md-12">
							<Box collapsable={true} removable={true} type="danger" solid={true} title="添加供应商">
								<Form onValidSubmit={this._handleSupplierAdd} ref={(view) => this._form=view} model={this.state.model}>
									<ValidatedInput
										type='text'
										label='供应商公司/个人名称'
										// Each input that you need validated should have
										// the "name" prop
										name='name'
										// Validation rules separated with comma
										validate='required,isLength:1:30'
										// Error messages for each error type
										errorHelp={{
                        required: '请输入供应商名称',
                        isLength: '长度在1~30之间'
                    }}
									/>
									<ValidatedInput
										type='text'
										label='供应商手机号码'
										// Each input that you need validated should have
										// the "name" prop
										name='phone'
										// Validation rules separated with comma
										validate='required,matches:^1[3|4|5|7|8]\d{9}$'
										// Error messages for each error type
										errorHelp={{
                        required: '请输入供应商手机号码',
                        matches: '您输入的手机号码不正确'
                    }}
									/>
									<ValidatedInput
										type='email'
										label='供应商邮箱地址'
										// Each input that you need validated should have
										// the "name" prop
										name='email'
										// Validation rules separated with comma
										validate='required,isEmail'
										// Error messages for each error type
										errorHelp={{
                        required: '请输入供应商邮箱',
                        isEmail: '您输入的邮箱不正确'
                    }}
									/>
									<FormGroup>
										<ControlLabel>供应商资质</ControlLabel>
										<DropzoneComponent
											config={componentConfig}
											action={`${config.domain}/upload/single`}
											eventHandlers={this.eventHandlers}
											djsConfig={djsConfig}
										/>
									</FormGroup>
									<Button type="submit" bsStyle="success">添加供应商</Button>
								</Form>
							</Box>
							<Box collapsable={true} removable={true} solid={true} title={"供应商列表"} type={"success"}>
								<BootstrapTable data={this.state.data}
								                striped={true}
								                hover={true}
								                remote={true}
								                condensed={true}
								                pagination={true}
								                ref={(view) => {this._table = view}}
								                fetchInfo={ {dataTotalSize: this.state.totalDataSize}}
								                deleteRow={true}
								                selectRow={{mode: 'checkbox'}}
								                options={{
								                	deleteText: '删除',
																	sizePerPage: this.state.sizePerPage,
																	onPageChange: this._handlePageAndSizeChange,
																	sizePerPageList: [10,20,30,50],
																	pageStartIndex: 1,
																	page: this.state.currentPage,
																	onDeleteRow: this._handleSupplierDelete,
								}}>
									<TableHeaderColumn isKey={true} dataField="_id" dataAlign="center">供应商编号</TableHeaderColumn>
									<TableHeaderColumn dataField="name" dataAlign="center">供应商名称</TableHeaderColumn>
									<TableHeaderColumn dataField="email" dataAlign="center">供应商邮箱</TableHeaderColumn>
									<TableHeaderColumn dataField="action" dataAlign="center" width={200}>操作</TableHeaderColumn>
								</BootstrapTable>
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
export default connect(mapStateToProps, mapDispatchToProps)(SupplierManager);