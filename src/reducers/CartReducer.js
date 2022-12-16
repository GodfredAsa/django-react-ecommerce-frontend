
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/CartConstants"


export const CartReducer = (state={cartItems: []}, action) =>{

    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product)
            if(existItem){
                // replaces existing item new item if item exists
                // if not returns the new item
                return {
                    ...state,
                    // x.product => product refers to product id in this instance
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item: x)
                }
            }else{
                return{
                    ...state,
                    cartItems: [...state.cartItems, item]
                 }
            }

        default:
            return state;
    }




}