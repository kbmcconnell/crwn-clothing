// this is where state lives, where we receive actions and dispatch them to the reducers to update the state
import { compose, createStore, applyMiddleware } from 'redux'
// import logger from 'redux-logger'
import { rootReducer } from './root-reducer'

const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action)
  }
  console.log('type', action.type)
  console.log('payload', action.payload)
  console.log('currentState', store.getState())

  // this is how we will see our next state
  next(action)
  console.log('next state', store.getState())
}
const middlewares = [loggerMiddleware]
const composedEnhancers = compose(applyMiddleware(...middlewares))

export const store = createStore(rootReducer, undefined, composedEnhancers)
