import 'core-js/fn/object/assign';
require('normalize.css/normalize.css');
// require('object-fit-images')
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {Router, Route, browserHistory, IndexRoute} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import configureStore from './stores/configureStore'
import Main from './components/front/Main'
import Home from './components/front/Home'
import Buy from './components/front/Buy'
import DevTools from './stores/DevTools'
import ShopCar from './components/front/ShopCar'
const store = configureStore('front')
const history = syncHistoryWithStore(browserHistory, store)
import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {cyan500} from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


// 自定义样式
const muiTheme = getMuiTheme({
	palette: {
		textColor: cyan500
	},
	appBar: {
		height: 100
	}
})

// Render the main component into the dom
ReactDOM.render(
	<MuiThemeProvider muiTheme={muiTheme}>
		<Provider store={store}>
			<div>
				<Router history={history}>
					<Route path="/" component={Main}>
						<IndexRoute component={Home}/>
						<Route path="shopcar" component={ShopCar} />
						<Route path="buy" component={Buy} />
					</Route>
				</Router>
				{/*{ process.env.NODE_ENV !== 'production' ? <DevTools/> : null}*/}
			</div>
		</Provider>
	</MuiThemeProvider>
	, document.getElementById('app'));
