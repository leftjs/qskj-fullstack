/**
 * Created by zhangjiasheng on 16/8/21.
 */
import React from 'react'
import Radium from 'radium'
import {Avatar,RaisedButton, Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn, FlatButton, Checkbox, IconButton, TextField} from 'material-ui'
import * as colors from 'material-ui/styles/colors'
import Add from 'material-ui/svg-icons/content/add-circle-outline'
import Remove from 'material-ui/svg-icons/content/remove-circle-outline'
import CheckCircle from 'material-ui/svg-icons/action/check-circle'
import RadioBtnUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked'
const styles = {
	container: {
		// padding: '1em'
	},
	checkbox:{
		width: 0
	},
	noticeNumber: {
		color: colors.red600,
		fontSize: '18px'
	}
}

class ShopCar extends React.Component {
	render() {
		return (
			<div style={styles.container}>
				<Table selectable={false}>
					<TableHeader displaySelectAll={false} adjustForCheckbox={false} style={{
						background: colors.lightBlue50,
					}}>
						<TableRow>
							{['商品名称', '单价', '数量', '应付金额', '备注'].map((name, index) => {
								if (index == 0) {
									return (<TableHeaderColumn colSpan="3" style={{color: colors.grey700}} key={`header_${index}`}>{name}</TableHeaderColumn>)

								}else if(index == 2) {
									// 数量
									return (<TableHeaderColumn colSpan="2" style={{color: colors.grey700, textAlign: 'center'}} key={`header_${index}`}>{name}</TableHeaderColumn>)
								}
								return (<TableHeaderColumn style={{color: colors.grey700}} key={`header_${index}`}>{name}</TableHeaderColumn>)
							})}
						</TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={false}>
						<TableRow>
							<TableRowColumn colSpan="3" >
								<div style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'flex-start',
								alignItems: 'center',
								padding: '10px 0'
							}}>
									<Checkbox
										checkedIcon={<CheckCircle />}
										uncheckedIcon={<RadioBtnUnchecked color={colors.red50}/>}
										style={styles.checkbox}
									/>
									<Avatar size={60}  src={require('../../../images/img/user2-160x160.jpg')}/>
									<span style={{
										marginLeft: 10,
								    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis'
									}}>青霜启动系统</span>
								</div>
							</TableRowColumn>
							<TableRowColumn>¥123</TableRowColumn>
							<TableRowColumn colSpan="2" style={{textAlign: 'center'}}>
								<IconButton>
									<Add color={colors.grey500}/>
								</IconButton>
								<TextField style={{width: '3rem'}} inputStyle={{textAlign: 'center'}}/>
								<IconButton>
									<Remove color={colors.grey500}/>
								</IconButton>
							</TableRowColumn>
							<TableRowColumn>¥123</TableRowColumn>
							<TableRowColumn>
								<div style={{padding: '0 10px 0 0'}}>
									<TextField name="remark" style={{width: '100%'}} hintText="无"/>
								</div>
							</TableRowColumn>
						</TableRow>
					</TableBody>
				</Table>

				<div style={{
						width: '100%',
						height: '50px',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						padding: 24,
						boxShadow: `0px -1px 1px 2px ${colors.grey200}`,
						background: `${colors.grey50}`
					}}>
					<div style={{
								height: '100%',
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'flex-start',
								alignItems: 'center'
							}}>
						<Checkbox
							checkedIcon={<CheckCircle />}
							uncheckedIcon={<RadioBtnUnchecked/>}
							label="全选"
						  style={{
						  	width: 0,
						  	marginTop: 8
						  }}
						  labelStyle={{
						  	width: 'auto'
						  }}
						/>
						<span style={{marginLeft: 16}}>|</span>
						<FlatButton label="删除选中的商品" labelStyle={{color: colors.grey500}} />
					</div>
					<div style={{
						height: '100%',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'flex-end',
						alignItems: 'center'
					}}>
						<div style={{
							marginRight: 10
						}}>
							共<span style={styles.noticeNumber}>2</span>件商品,已选择<span style={styles.noticeNumber}>2</span>件商品,总计(不含运费): <span style={styles.noticeNumber}>¥123</span>
						</div>
						<RaisedButton label="现在结算" backgroundColor={colors.orangeA200} labelColor={colors.white}/>
					</div>

				</div>

			</div>
		)
	}
}


export default Radium(ShopCar)


