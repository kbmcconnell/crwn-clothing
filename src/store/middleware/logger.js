// good for debugging - can just use react logger otherwise
// TODO not in use - using react logger
export const loggerMiddleware = (store) => (next) => (action) => {
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
