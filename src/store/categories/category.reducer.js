import CATEGORIES_ACTION_TYPES from './category.types'

export const CATEGORIES_INITIAL_STATE = {
  categories: [],
  isLoading: false,
  error: null,
}

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return {...state, isLoading: true} // the moment we start fetching we are in a loading state
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return {...state, categories: payload, isLoading: false} // once we get a result and it's successful we are no longer loading
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAIL:
      return {...state, error: payload, isLoading: false}
    default:
      return state
  }
}
