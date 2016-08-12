/**
 * Created by zhangjiasheng on 7/23/16.
 */

// <li className="header">首页</li>
// <li className={this.state.menu === 'home' ? 'active' : ''} onClick={this._handleClick}><a ><i className="fa fa-desktop" /> <span value='home'>控制台</span></a></li>
// <li className="header">我</li>
// <li className={this.state.menu === 'profile' ? 'active' : ''} onClick={this._handleClick}><a><i className="fa fa-cog" ></i><span>个人资料</span></a></li>
// <li className="header">报表</li>
// <li><a href=""><i className="fa fa-pie-chart"></i><span>财务报表</span></a></li>
// <li><a href=""><i className="fa fa-pie-chart"></i><span>销售报表</span></a></li>
// <li className="header">管理</li>
//  <li><a href=""><i className="fa fa-book"></i><span>客户管理</span></a></li>
//  <li><a href=""><i className="fa fa-book"></i><span>供应商管理</span></a></li>
//  <li><a href=""><i className="fa fa-book"></i><span>订单管理</span></a></li>
//  <li><a href=""><i className="fa fa-book"></i><span>产品管理</span></a></li>
//  <li><a href=""><i className="fa fa-book"></i><span>NEWS管理</span></a></li>
//  <li><a href=""><i className="fa fa-book"></i><span>论坛管理</span></a></li>
//  <li><a href=""><i className="fa fa-book"></i><span>员工管理</span></a></li>


export default {
	admin: {
		首页: [
			{
				name: 'home',
				path: '/',
				value: '控制台',
				icon: 'desktop'
			}
		],
		我: [
			{
				name: 'profile',
				path: '/profile',
				value: '个人资料',
				icon: 'cog'
			}
		],
		报表: [
			{
				name: 'moneyreport',
				path: '/moneyreport',
				value: '财务报表',
				icon: 'pie-chart'
			},
			{
				name: 'salereport',
				path: '/salereport',
				value: '销售报表',
				icon: 'pie-chart'
			}
		],
		管理: [
			{
				name: 'productmanager',
				path: '/productmanager',
				value: '产品管理',
				icon: 'book'
			},
			{
				name: 'usermanager',
				path: '/usermanager',
				value: '用户管理',
				icon: 'book'
			},
			{
				name: 'suppliermanager',
				path: '/suppliermanager',
				value: '供应商管理',
				icon: 'book'
			},
			{
				name: 'ordermanager',
				path: '/ordermanager',
				value: '订单管理',
				icon: 'book'
			},
			{
				name: 'newsmanager',
				path: '/newsmanager',
				value: 'NEWS管理',
				icon: 'book'
			},
			{
				name: 'forummanager',
				path: '/forummanager',
				value: '论坛管理',
				icon: 'book'
			},
			{
				name: 'staffmanager',
				path: '/staffmanager',
				value: '员工管理',
				icon: 'book'
			}
		]

	}
}
