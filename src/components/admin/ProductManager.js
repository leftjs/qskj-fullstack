/**
 * Created by zhangjiasheng on 7/23/16.
 */
import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../../actions/admin'
import Box from './elements/Box'
import _ from 'lodash'
import {Form, ValidatedInput, Radio, RadioGroup, FileValidator} from 'react-bootstrap-validation'
import {Button, Modal, Carousel, Media} from 'react-bootstrap'
import Alert from 'react-s-alert'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'




class ProductManager extends React.Component{



	state = {
		height: 0,
		model: {
			_id: '',
			name: '',
			price: '',
			quality_guarantee: '',
			stock: '',
			desc: '',
		},
		modalModel: {},
		showModal: false, // 打开详情页
		data: [],
		sizePerPage: 10,
		currentPage: 1,
		totalDataSize: 0,
		mode: 'create', // enum 'create', 'update'
	}

	componentDidMount() {
		this.setState({
			height: window.innerHeight - 101
		})
	}

	componentWillMount() {
		this._updateProductsList()
	}


	_updateProductsList = () => {
		this.props.actions.getProductByPageAndSize({page: this.state.currentPage, size: this.state.sizePerPage}).then(this._handleNewData).catch((err) => {
			Alert.error("获取产品列表失败")
		})
	}



	_handleProductPublish = (e) => {
		var mydata = new FormData()
		_.map(e, (value, key) => {
			if (typeof value === 'object') {
				_.map(_.values(value), (value2) => {
					mydata.append(key, value2)
				})
			}else {
				mydata.append(key, value)
			}
		})
		if (this.state.mode == 'create') {
			this.props.actions.addProduct(mydata).then((res) => {
				Alert.success('产品发布成功')
				this._form.refs.form.reset()
				this._updateProductsList()
			}).catch((err) => {
				Alert.error('产品发布失败')
			})
		}else {
			mydata.append('_id', this.state.model._id)
			this.props.actions.addProduct(mydata).then((res) => {
				Alert.success('产品更新成功')
				this.setState({
					model: {
						_id: '',
						name: '',
						price: '',
						quality_guarantee: '',
						stock: '',
						desc: '',
					},
					mode: 'create'
				})
				this._form.refs.form.reset()
				this._updateProductsList()
			}).catch((err) => {
				Alert.error('产品更新失败')
			})
		}

	}


	_handleNewData =(res) => {


		let data = res.value.data
		_.map(data, (product) => {

			const _openDetail = () => {
				this.setState({
					modalModel: product,
					showModal: true
				})
			}

			const _toggleUpdate = () => {
				this.setState({
					mode: 'update',
					model: product
				})
				this._form.refs.form.reset()
				this._nameInput.refs.input.focus()
			}


			const _deleteProduct = () => {
				this.props.actions.deleteProductById({id: product._id}).then((res) => {
					Alert.success("删除成功")
					this._updateProductsList()
				}).catch((err) => {
					Alert.error("删除失败")
				})
			}

			product['action'] = <div style={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-around'
			}}>
				<Button bsSize="xsmall" bsStyle="danger" onClick={_deleteProduct}>删除</Button>
				<Button bsSize="xsmall" bsStyle="warning" onClick={_toggleUpdate}>更新</Button>
				<Button bsSize="xsmall" bsStyle="info" onClick={_openDetail}>详情</Button>
			</div>
		})
		this.setState({
			data: res.value.data,
			sizePerPage: res.value.sizePerPage,
			currentPage: res.value.currentPage,
			totalDataSize: res.value.totalDataSize
		})
		Alert.success("获取产品列表成功")
	}
	_handlePageAndSizeChange =(page,size) => {
		this.props.actions.getProductByPageAndSize({page, size}).then(this._handleNewData)

	}

	_closeModal = () => {
		this.setState({
			showModal: false,
			modalModel: {}
		})
	}


	render() {
		return (
			<div className="content-wrapper" style={{minHeight: this.state.height}}>
				<section className="content-header">
					<h1>
						产品管理
						<small>您身边的大管家,查库存查型号查...~~</small>
					</h1>
				</section>
				<section className="content" >

					<Modal show={this.state.showModal} bsSize="large" onHide={this._closeModal}>
						<Modal.Header>
							<Modal.Title>详情</Modal.Title>
						</Modal.Header>
						<Modal.Body>

							<div>
								<Media.Right>
									<Media.Body>
										<Media.Heading>产品名称</Media.Heading>
										<p>{this.state.modalModel.name}</p>
									</Media.Body>
									<br/>
									<Media.Body>
										<Media.Heading>产品编号</Media.Heading>
										<p>{this.state.modalModel._id}</p>
									</Media.Body>
									<br/>
									<Media.Body>
										<Media.Heading>产品保质期</Media.Heading>
										<p>{this.state.modalModel.quality_guarantee} 天</p>
									</Media.Body>
									<br/>
									<Media.Body>
										<Media.Heading>库存</Media.Heading>
										<p>{this.state.modalModel.stock} 套</p>
									</Media.Body>
									<br/>
									<Media.Body>
										<Media.Heading>产品价格</Media.Heading>
										<p>{this.state.modalModel.price} 元</p>
									</Media.Body>
									<br/>
									<Media.Body>
										<Media.Heading>产品简介</Media.Heading>
										<p>{this.state.modalModel.desc}</p>
									</Media.Body>
								</Media.Right>
								<br/>
								<Carousel>
									{_.map(this.state.modalModel.image_url, (ele,index) => {
										return (
											<Carousel.Item key={index}>
												<img width={900} height={500} alt="900x500" src={ele}/>
											</Carousel.Item>
										)
									})}
								</Carousel>
							</div>

						</Modal.Body>
						<Modal.Footer>
							<Button onClick={this._closeModal}>关闭</Button>
						</Modal.Footer>
					</Modal>
					<Box type='success' title={this.state.mode == 'create' ? "添加产品" : "更新产品" } collapsable={true} removable={true} solid={true} loading={this.props.add_product_loading}>
						<Form onValidSubmit={this._handleProductPublish} ref={(view) => this._form=view} model={this.state.model}>
							<ValidatedInput
								ref={(view) => {
									this._nameInput = view
								}}
								type='text'
								label='产品名称'
								// Each input that you need validated should have
								// the "name" prop
								name='name'
								// Validation rules separated with comma
								validate='required,isLength:1:30'
								// Error messages for each error type
								errorHelp={{
                        required: '请输入产品名称',
                        isLength: '长度在1~30之间'
                    }}
							/>

							<ValidatedInput
								type='number'
								label='产品单价(元)'
							  step="0.01"
								// Each input that you need validated should have
								// the "name" prop
								name='price'
								// Validation rules separated with comma
								validate='required,isLength:1:7'
								// Error messages for each error type
								errorHelp={{
                        required: '请输入产品名称',
                        isLength: '长度在1~7之间'
                    }}
							/>
							<ValidatedInput
								type='number'
								label='保质期(天)'
								// Each input that you need validated should have
								// the "name" prop
								name='quality_guarantee'
								// Validation rules separated with comma
								validate='required,isInt'
								// Error messages for each error type
								errorHelp={{
                        required: '请输入产品保质期',
                        isInt: '保质期必须为整数'
                    }}
							/>
							<ValidatedInput
								type='number'
								label='库存数(套)'
								// Each input that you need validated should have
								// the "name" prop
								name='stock'
								// Validation rules separated with comma
								validate='required,isInt'
								// Error messages for each error type
								errorHelp={{
                        required: '请输入产品库存数',
                        isInt: '库存数必须为整数'
                    }}
							/>
							<ValidatedInput
								type='textarea'
								label='产品描述'
								// Each input that you need validated should have
								// the "name" prop
								name='desc'
								rows="5"
								wrap="hard"
								// Validation rules separated with comma
								validate='required'
								// Error messages for each error type
								errorHelp={{
                        required: '产品描述',

                    }}
							/>

							<ValidatedInput
								ref="file"
								name="files"
								type='file'
								label='产品图片'
								multiple
								validate={files => {
					        if (FileValidator.isEmpty(files)) {
					            return '请选择一张图片';
					        }

					        if (!FileValidator.isFilesCount(files, 1, 10)) {
					            return '您至多只能选择10张图片';
					        }

					        if (!FileValidator.isTotalSize(files, 0, 1048576 * 10)) {
					            return '总大小必须不超过10MB';
					        }

					        if (!FileValidator.isEachFileSize(files, 0, 1048576 * 2)) {
					            return '每一个文件不超过2MB';
					        }

					        if (!FileValidator.isExtension( files, [ 'png', 'jpg', 'jpeg', 'gif' ])) {
					            return '该文件类型不支持上传,请选择图片,以png/jpg/jpeg/gif结尾的文件';
					        }

					        return true;
					    }}
							/>
							<Button type="submit" bsSize="lg" bsStyle="success" >{this.state.mode == 'create' ? "发布" : "更新"}</Button>
						</Form>
					</Box>
					<Box title="产品列表" type="danger" solid={true} removable={true} collapsable={true}>
						<BootstrapTable data={this.state.data}
						                striped={true} hover={true} remote={true} condensed={true} pagination={true} ref={(view) => {this._table = view}} fetchInfo={ {dataTotalSize: this.state.totalDataSize}}
						options={{
							sizePerPage: this.state.sizePerPage,
							onPageChange: this._handlePageAndSizeChange,
							sizePerPageList: [10,20,30,50],
							pageStartIndex: 1,
							page: this.state.currentPage,
						}}>
							<TableHeaderColumn isKey={true} dataField="_id" dataAlign="center">产品编号</TableHeaderColumn>
							<TableHeaderColumn dataField="name" dataAlign="center" >产品名称</TableHeaderColumn>
							<TableHeaderColumn dataField="price" dataAlign="center">产品价格(元)</TableHeaderColumn>
							<TableHeaderColumn dataField="quality_guarantee" dataAlign="center">保质期(天)</TableHeaderColumn>
							<TableHeaderColumn dataField="stock" dataAlign="center">库存(套)</TableHeaderColumn>
							<TableHeaderColumn dataField="action" dataAlign="center" width={200}>操作</TableHeaderColumn>
						</BootstrapTable>
					</Box>
				</section>
			</div>
		)
	}
}

function mapStateToProps(state) {
	/* Populated by react-webpack-redux:reducer */
	const {add_product_loading } = state.product
	const props = {
		add_product_loading
	};
	return props;
}
function mapDispatchToProps(dispatch) {
	/* Populated by react-webpack-redux:action */
	return {
		actions: {...bindActionCreators(actions, dispatch)}
	}


}
export default connect(mapStateToProps, mapDispatchToProps)(ProductManager);