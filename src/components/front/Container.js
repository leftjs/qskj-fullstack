/**
 * Created by zhangjiasheng on 16/8/13.
 */
import React from 'react'
class Container extends React.Component {



	componentDidMount() {
		$(this._shopcar).dropdown({
			on: 'hover'
		})

	}
	render(){
		return (
			<div>
				<div className="ui borderless fixed main menu" ref={(view) => this._nav = view}>
					<div className="ui text container">
						<div href="#" className="header item">
							<img className="logo" src={require('../../images/img/user2-160x160.jpg')}/>
							Project Name
						</div>
						<a href="#" className="item active">Blog</a>
						<a href="#" className="item">Articles</a>
						<a href="#" className="ui right floated dropdown item" tabIndex={0} ref={(view) => this._shopcar = view}>
							<i className="shop outline large icon" />
							<div className="menu transition hidden" tabIndex={-1}>
								<div className="item">Link Item</div>
								<div className="item">Link Item</div>
								<div className="divider" />
								<div className="header">Header Item</div>
								<div className="item">
									<i className="dropdown icon" />
									Sub Menu
									<div className="menu transition hidden">
										<div className="item">Link Item</div>
										<div className="item">Link Item</div>
									</div>
								</div>
								<div className="item">Link Item</div>
							</div>
						</a>
					</div>
				</div>

				{this.props.children}
			</div>
		)
	}
}

export default Container