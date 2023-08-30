import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import CategoriesPreview from '../categories-preview/categories-preview.component'
import Category from '../category/category.component'
import { useEffect } from 'react'
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils'
import { setCategories } from '../../store/categories/category.action'

const Shop = () => {
  const dispatch = useDispatch()
  // to use the async function getCategoriesAndDocuments() in useEffect() we need to wrap the function in a separate
  // async function then call the function at the end of useEffect()
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesArray = await getCategoriesAndDocuments('categories')
      dispatch(setCategories(categoriesArray))
    }
    getCategoriesMap()
  }, []) // the empty array means this is only called when the app is mounted

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  )
}

export default Shop
