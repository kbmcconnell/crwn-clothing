import {createContext, useEffect, useState} from 'react'
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils'

export const CategoriesContext = createContext({
  categoriesMap: {},
})

export const CategoriesProvider = ({children}) => {
  const [categoriesMap, setCategoriesMap] = useState({})

  // to use the async function getCategoriesAndDocuments() in useEffect() we need to wrap the function in a separate
  // async function then call the function at the end of useEffect()
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments()
      setCategoriesMap(categoryMap)
    }
    getCategoriesMap()
  }, []) // the empty array means this is only called when the app is mounted

  const value = {categoriesMap}
  return (
    <CategoriesContext.Provider value={value}>{ children }</CategoriesContext.Provider>
  )
}
