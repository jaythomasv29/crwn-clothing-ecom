// Combines reducers together 
import { combineReducers } from 'redux'

import { UserState, userReducer } from './user/user.reducer'
import { ProductCatalogState, productCatalogReducer } from './product-catalog/product-catalog.reducer'
import { CartState, cartReducer } from './cart/cart.reducer'

export interface RootState {
  user: UserState;
  products: ProductCatalogState;
  cart: CartState;
}

export const rootReducer = combineReducers({
  user: userReducer,
  products: productCatalogReducer,
  cart: cartReducer,
})

