import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {Router, Route, browserHistory, IndexRoute} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import configureStore from './stores/configureStore'
import Main from './components/admin/Main';
import ProductManager from './components/admin/ProductManager'
import UserManager from './components/admin/UserManager'
import OrderManager from './components/admin/OrderManager'
import SupplierManager from './components/admin/SupplierManager'
import Home from './components/admin/Home'
const store = configureStore('admin')
const history = syncHistoryWithStore(browserHistory, store)



// Render the main component into the dom
ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/admin" component={Main}>
				<IndexRoute component={Home}/>
				<Route path='productmanager' component={ProductManager}/>
				<Route path='usermanager' component={UserManager}/>
				<Route path='ordermanager' component={OrderManager}/>
				<Route path='suppliermanager' component={SupplierManager}/>
			</Route>
		</Router>
	</Provider>
	, document.getElementById('app'));
