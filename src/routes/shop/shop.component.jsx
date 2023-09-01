import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import CategoriesPreview from '../categories-preview/categories-preview.component'
import Category from '../category/category.component'
import { useEffect } from 'react'
import { fetchCategoriesStart } from '../../store/categories/category.action'

const Shop = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCategoriesStart())
  }, []) // the empty array means this is only called when the app is mounted

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  )
}

export default Shop
