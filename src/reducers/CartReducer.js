
import { 
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM, 
    CART_SAVE_SHIPPING_ADDRESS ,
    CART_SAVE_PAYMENT_METHOD,
    CART_CLEAR_ITEMS,

} from "../constants/CartConstants"


export const CartReducer = (state={cartItems: [], shippingAddress: {}}, action) =>{

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

    case CART_SAVE_SHIPPING_ADDRESS:
        return{...state,
            shippingAddress: action.payload
        }

    case CART_SAVE_PAYMENT_METHOD:
        return{
            ...state,
            paymentMethod: action.payload
        }

    case CART_CLEAR_ITEMS:
        return{
            ...state,
            cartItems: []
        }

        default:
            return state;
    }
}

export default CartReducer;