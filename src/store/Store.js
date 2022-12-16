import {createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import  productListReducers from '../reducers/ProductListReducers'
import  ProductDetailReducer from '../reducers/ProductDetailReducer'

const reducer = combineReducers({
    productList: productListReducers,
    productDetails: ProductDetailReducer,
})


const initialState = {}
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default  store