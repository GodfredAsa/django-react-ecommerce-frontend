import {createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import  productListReducers from '../reducers/ProductListReducers'
import  ProductDetailReducer from '../reducers/ProductDetailReducer'
import {CartReducer} from "../reducers/CartReducer"


const reducer = combineReducers({
    productList: productListReducers,
    productDetails: ProductDetailReducer,
    cart: CartReducer,
})

// pulling cart data from localStorage into our state
// if item exist get items from local storage if not return empty array 
const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
JSON.parse(localStorage.getItem('cartItems')): []

// adding cartItems to initial state
const initialState = {
    cart: {cartItems: cartItemsFromStorage}
}
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default  store