import {createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import  { 
    productListReducers, 
    ProductDeleteReducer, 
    ProductCreateReducer,
    ProductUpdateReducer, 
} from '../reducers/ProductListReducers'
import  ProductDetailReducer from '../reducers/ProductDetailReducer';
import CartReducer from "../reducers/CartReducer"
import {
    OrderCreateReducer,
    OrderDetailsReducer,
    OrderPayReducer,
    MyOrderListReducer,
    OrderListReducer,
    OrderDeliverReducer,
} from "../reducers/OrderReducers"
import {
    UserLoginReducer, 
    UserRegisterReducer, 
    UserDetailsReducer, 
    UserUpdateProfileReducer,
    UserListReducer,
    DeleteUserReducer,
    UpdateUserReducer
    
} from "../reducers/UserReducer"


const reducer = combineReducers({
    productList: productListReducers,
    productDetails: ProductDetailReducer,
    deleteProduct: ProductDeleteReducer,
    createProduct: ProductCreateReducer,
    updateProduct: ProductUpdateReducer,
    
    cart: CartReducer,
    orderCreate: OrderCreateReducer,
    orderDetails: OrderDetailsReducer,
    orderPay: OrderPayReducer,
    orderList: OrderListReducer,
    orderDeliver: OrderDeliverReducer,
   
    userLogin: UserLoginReducer,
    userRegister: UserRegisterReducer,
    userDetails: UserDetailsReducer,
    userUpdateProfile: UserUpdateProfileReducer,
    myOrderList: MyOrderListReducer,
    userList: UserListReducer,
    deleteUser: DeleteUserReducer,
    updateUser: UpdateUserReducer,
})

// pulling cart data from localStorage into our state
// if item exist get items from local storage if not return empty array 
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const myOrdersFromStorage = localStorage.getItem('myOrders') ? JSON.parse(localStorage.getItem('myOrders')) : []

// retrieving userInfo set in local Storage in userActions.js if user login is successful
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {} 
    
const shippingAddressFromStorage = localStorage.getItem('shippingAdress') ? JSON.parse(localStorage.getItem('shippingAdress')) : {} 
// adding cartItems to initial state
const initialState = {
    cart: { cartItems: cartItemsFromStorage,
            shippingAdrress: shippingAddressFromStorage,
    },
    userLogin: { userInfo: userInfoFromStorage},
    myOrderList:{ myOrders: myOrdersFromStorage},
}
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default  store