// this is where state lives, where we receive actions and dispatch them to the reducers to update the state
import { compose, createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { rootReducer } from './root-reducer'

const middlewares = [process.env.NODE_ENV === 'development' && logger].filter(
  Boolean
)

const composedEnhancers = compose(applyMiddleware(...middlewares))

export const store = createStore(rootReducer, undefined, composedEnhancers)

