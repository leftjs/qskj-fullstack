import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import logger from 'redux-logger'
import {admin, front} from '../reducers'

const middlewares = [
	thunkMiddleware,
	promiseMiddleware(),
	logger()
]


export default function(end = 'admin', initialState = {}) {
	let store
	let nextReducer
	if(end == 'front'){
		store = createStore(front, initialState, applyMiddleware(
			...middlewares
		))
		nextReducer = require('../reducers').front
	}else {
		store = createStore(admin, initialState, applyMiddleware(
			...middlewares
		))
		nextReducer = require('../reducers').admin
	}
	//const store = applyMiddleware(...middlewares)(createStore)(reducers, initialState)



  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
