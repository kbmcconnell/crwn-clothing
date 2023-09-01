// this is where state lives, where we receive actions and dispatch them to the reducers to update the state
import { compose, createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'
import { rootReducer } from './root-reducer'
// import thunk from 'redux-thunk' replacing with saga
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './root-saga'

const persistConfig = {
  key: 'root',
  storage,
  // blacklist: ['user'], we could blacklist user because the authenticator is persisting the information for us
  whitelist: ['cart']
}

const sagaMiddleware = createSagaMiddleware()

const persistedReducer = persistReducer(persistConfig, rootReducer)
// we only want the logger to post to the console when we're in a test environment
const middlewares = [process.env.NODE_ENV !== 'production' && logger, sagaMiddleware].filter(
  Boolean
)
const composedEnhancer = (
  process.env.NODE_ENV !== 'production'
  && window
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  || compose

const composedEnhancers = composedEnhancer(applyMiddleware(...middlewares))

export const store = createStore(persistedReducer, undefined, composedEnhancers)

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)
