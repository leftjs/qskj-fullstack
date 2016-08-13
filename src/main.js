import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {Router, Route, browserHistory, IndexRoute} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import configureStore from './stores/configureStore'
import Main from './components/front/Main'
import Home from './components/front/Home'
import DevTools from './stores/DevTools'
import ShopCar from './components/front/ShopCar'
const store = configureStore('front')
const history = syncHistoryWithStore(browserHistory, store)



// Render the main component into the dom
ReactDOM.render(
	<Provider store={store}>
		<div>
			<Router history={history}>
				<Route path="/" component={Main}>
					<IndexRoute component={Home}/>
					<Route path="shopcar"  component={ShopCar} />
				</Route>
			</Router>
			{/*{ process.env.NODE_ENV !== 'production' ? <DevTools/> : null}*/}
		</div>
	</Provider>
	, document.getElementById('app'));
