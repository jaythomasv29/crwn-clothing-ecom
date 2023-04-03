// Combines reducers together 
import { combineReducers } from 'redux'

import { userReducer } from './user/user.reducer'
import { productCatalogReducer } from './product-catalog/product-catalog.reducer'
export const rootReducer = combineReducers({
  user: userReducer,
  products: productCatalogReducer
})

