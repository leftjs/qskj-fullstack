import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {Router, Route, browserHistory, IndexRoute} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import configureStore from './stores/configureStore'
import Main from './components/Main';
import ProductManager from './components/ProductManager'
import UserManager from './components/UserManager'
import OrderManager from './components/OrderManager'
import SupplierManager from './components/SupplierManager'
import Home from './components/Home'
const store = configureStore()
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
