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
import Login from './components/front/Login'
import DevTools from './stores/DevTools'
import ShopCar from './components/front/ShopCar'
import Register from './components/front/Register'
const store = configureStore('front')
const history = syncHistoryWithStore(browserHistory, store)
import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as colors from 'material-ui/styles/colors'
import {fade} from 'material-ui/utils/colorManipulator'
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


// 自定义样式
const muiTheme = getMuiTheme({
	palette: {
		primary1Color: colors.cyan500,
		primary2Color: colors.cyan700,
		primary3Color: colors.grey400,
		accent1Color: colors.pinkA200,
		accent2Color: colors.grey100,
		accent3Color: colors.grey500,
		textColor: colors.darkBlack,
		alternateTextColor: colors.white,
		canvasColor: colors.white,
		borderColor: colors.grey300,
		disabledColor: fade(colors.darkBlack, 0.3),
		pickerHeaderColor: colors.cyan500,
		clockCircleColor: fade(colors.darkBlack, 0.07),
		shadowColor: colors.fullBlack,
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
						<Route path="register" component={Register}/>
						<Route path="login" component={Login}/>
					</Route>
				</Router>
				{/*{ process.env.NODE_ENV !== 'production' ? <DevTools/> : null}*/}
			</div>
		</Provider>
	</MuiThemeProvider>
	, document.getElementById('app'));
