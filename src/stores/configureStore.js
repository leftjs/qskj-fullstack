import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import logger from 'redux-logger'
const reducers = require('../reducers').default;

const middlewares = [
	thunkMiddleware,
	promiseMiddleware(),
	logger()
]


export default function(initialState = {}) {

	//const store = applyMiddleware(...middlewares)(createStore)(reducers, initialState)

	const store = createStore(reducers, initialState, applyMiddleware(
		...middlewares
	))

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
