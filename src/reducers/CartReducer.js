
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
//  adding remove item from cart reducer 


case CART_REMOVE_ITEM:
    // in action.payload is the id 
    return{
        ...state, 
        cartItems: state.cartItems.filter(x => x.product !== action.payload)
    }

        default:
            return state;
    }
}

export default CartReducer;