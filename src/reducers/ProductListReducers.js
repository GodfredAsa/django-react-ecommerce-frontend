import {
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL } from '../constants/ProductConstants'
 const productListReducers = (state = {products: []}, action) =>{

    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading: true, products: []}

        case PRODUCT_LIST_SUCCESS:
            return {loading: true, products: action.payload}

        case PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state
        }
    }

    export default productListReducers;



