import { takeLatest, all, call, put } from 'redux-saga/effects'
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils'
import { fetchCategoriesSuccess, fetchCategoriesFail} from './category.action'
import CATEGORIES_ACTION_TYPES from './category.types'

export function* fetchCategoriesAsync() {
  try {
    // use call() when you want to yield a function
    // 'categories' is the arg that goes into getCategoriesAndDocuments
    const categoriesArray = yield call(getCategoriesAndDocuments, 'categories')
    yield put(fetchCategoriesSuccess(categoriesArray))
  } catch (error) {
    yield put(fetchCategoriesFail(error))
  }
}

export function* onFetchCategories() {
  // take is where we receive actions. takeLatest() takes the most recent action
  yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}

export function* categoriesSaga() {
  // creates a pause in the execution of the function
  // categoriesSaga() will pause execution until all of the functions inside of the array are complete
  yield all([call(onFetchCategories)])

}
