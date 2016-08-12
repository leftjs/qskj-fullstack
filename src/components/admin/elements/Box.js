/**
 * Created by zhangjiasheng on 7/23/16.
 */
import React from 'react'

export default class Box extends React.Component {

	static propTypes = {
		type: React.PropTypes.oneOf(['danger', 'default', 'success', 'warning', 'info', 'error']),
		solid: React.PropTypes.bool,
		collapsable: React.PropTypes.bool,
		removable: React.PropTypes.bool,
		title: React.PropTypes.any,
		loading: React.PropTypes.bool,
		footer: React.PropTypes.any,
	}

	static defaultProps = {
		type: 'default',
		solid: false,
		collapsable: false,
		removable: false,
		title: null,
		loading: false,
	}

	render() {
		return(
			<div className={`box box-${this.props.type} ${this.props.solid ? 'box-solid' : ''}`}>
				<div className="box-header with-border">
					<h3 className="box-title">{this.props.title}</h3>
					<div className="box-tools pull-right">
						{this.props.collapsable ? <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus" /></button> : null}
						{this.props.removable ? <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-remove" /></button>: null}
					</div>
				</div>
				{/* /.box-header */}
				<div className="box-body">
					{this.props.children}
				</div>
				{this.props.loading ? <div className="overlay"> <i className="fa fa-refresh fa-spin"></i> </div> : null}
				{/* /.box-body */}
				{!!this.props.footer ? <div className="box-footer"> {this.props.footer} </div> : null}
			</div>

		)
	}
}