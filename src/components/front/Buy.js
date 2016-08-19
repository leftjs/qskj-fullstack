/**
 * Created by zhangjiasheng on 16/8/19.
 */
import React from 'react'
import Radium from 'radium'
import Box from './elements/Box'
import {FlatButton} from 'material-ui'
import * as colors from 'material-ui/styles/colors'

const styles = {
	container: {
		marginTop: 30,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	box: {
		width: '80%'
	},
	addressContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems:'center',
		padding: '1em',
	},
	address: {
		// display: 'flex',
		width: '30%',
		padding: '0.8em',
		height: 'auto',
		lineHeight: 'auto',
		borderRadius: 5,
		border: `2px solid ${colors.orangeA200}`,
		position: 'relative',
	},
	addressSelect: {
		position: 'absolute',
		top: 10,
		right: 10,
		fontSize: 10,
		lineHeight: '16px',
		width: 16,
		height: 16,
		borderRadius: 8,
		color: 'white',
		textAlign: 'center',
		background: `${colors.orangeA200}`

	},
	ellipsis: {
		margin: 0,
		// textOverflow: 'ellipsis', /*这就是省略号喽*/
		// overflow: 'hidden',/*设置超过的隐藏*/
		// whiteSpace: 'nowrap',/*设置不折行*/
		width: '100%'/*设置宽度*/
	}
}

class Buy extends React.Component {
	render(){
		return (
			<div style={styles.container}>
				<Box title="收货信息"
				     style={styles.box}
				     menu={<FlatButton style={{minWidth: 0}} label="使用新地址"></FlatButton>}>
					<div style={styles.addressContainer}>
						<FlatButton style={styles.address} icon={
							<div>
								<p style={styles.addressSelect}>✔</p>
								<p style={styles.ellipsis}>张三</p>
								<p style={styles.ellipsis}>17012346896</p>
								<p style={styles.ellipsis}>上海市上海浦东新区软杨南路哈哈懂第三方达</p>
							</div>
						}/>
					</div>
				</Box>
				<Box title={"发票信息"} style={[styles.box, {marginTop: 20}]}></Box>
			</div>
		)
	}
}

export default Radium(Buy)