import {
ORDER_CREATE_REQUEST,
ORDER_CREATE_SUCCESS,
ORDER_CREATE_FAIL,

ORDER_CREATE_RESET,

ORDER_DETAILS_REQUEST,
ORDER_DETAILS_SUCCESS,
ORDER_DETAILS_FAIL,

ORDER_PAY_REQUEST,
ORDER_PAY_SUCCESS,
ORDER_PAY_FAIL,
ORDER_PAY_RESET,

MY_ORDER_LIST_REQUEST,
MY_ORDER_LIST_SUCCESS,
MY_ORDER_LIST_FAIL,
MY_ORDER_LIST_RESET,

ORDER_LIST_REQUEST,
ORDER_LIST_SUCCESS,
ORDER_LIST_FAIL,

ORDER_DELIVER_REQUEST,
ORDER_DELIVER_SUCCESS,
ORDER_DELIVER_FAIL,
ORDER_DELIVER_RESET,
} from '../constants/OrderConstants'

export const OrderCreateReducer = (state ={}, action) => {

    switch(action.type){

        case ORDER_CREATE_REQUEST:
            return {
                loading: true
            }

        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }

        case ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
            
        case ORDER_CREATE_RESET:
            return {}

        default:
            return state;
    }
}

// ===== ORDER DETAILS REDUCER ======
export const OrderDetailsReducer = (state ={ orderItems: [], shippingAddress: {}}, action) => {

    switch(action.type){

        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }

        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
}


// ===== ORDER PAY REDUCER ======
export const OrderPayReducer = (state ={}, action) => {

    switch(action.type){

        case ORDER_PAY_REQUEST:
            return {
                loading: true
            }

        case ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case ORDER_PAY_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case ORDER_PAY_RESET:
            return { }
        
        default: 
            return state;
    }
}

// ORDER DELIVER REDUCER 
export const OrderDeliverReducer = (state ={}, action) => {

    switch(action.type){

        case ORDER_DELIVER_REQUEST:
            return {
                loading: true
            }

        case ORDER_DELIVER_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case ORDER_DELIVER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case ORDER_DELIVER_RESET:
            return { }
        
        default: 
            return state;
    }
}



// MY ORDER LIST REDUCER

export const MyOrderListReducer = (state ={orders: []}, action) => {

    switch(action.type){

        case MY_ORDER_LIST_REQUEST:
            return {
                loading: true
            }

        case MY_ORDER_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }

        case MY_ORDER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case MY_ORDER_LIST_RESET:
            return {
                orders: []
            }
        
        default:
            return state;
    }
}


export const OrderListReducer = (state ={orders: []}, action) => {

    switch(action.type){

        case ORDER_LIST_REQUEST:
            return {
                loading: true
            }

        case ORDER_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }

        case ORDER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        
        default:
            return state;
    }
}

