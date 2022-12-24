import {createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import  productListReducers from '../reducers/ProductListReducers'
import  ProductDetailReducer from '../reducers/ProductDetailReducer'
import CartReducer from "../reducers/CartReducer"
import UserLoginReducer from "../reducers/UserReducer"

const reducer = combineReducers({
    productList: productListReducers,
    productDetails: ProductDetailReducer,
    cart: CartReducer,
    userLogin: UserLoginReducer
})

// pulling cart data from localStorage into our state
// if item exist get items from local storage if not return empty array 
const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
    JSON.parse(localStorage.getItem('cartItems')): []

// retrieving userInfo set in local Storage in userActions.js if user login is successful
const userInfoFromStorage = localStorage.getItem('userInfo') ? 
    JSON.parse(localStorage.getItem('userInfo')): {} 

// adding cartItems to initial state
const initialState = {
    cart: { cartItems: cartItemsFromStorage},
    userLogin: { userInfo: userInfoFromStorage}
}
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default  store