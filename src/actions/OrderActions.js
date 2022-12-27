import axios from 'axios'
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,

    } from '../constants/OrderConstants';

    import {CART_CLEAR_ITEMS} from '../constants/CartConstants'

    export const CreateOrder = (order) => async (dispatch, getState) =>{
        try{
            dispatch({type: ORDER_CREATE_REQUEST});
    
            // getting the login user
            const {
                userLogin: {userInfo}
            } = getState()
    
            const config = {
                headers: {'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
            };
    
            const {data} = await axios.post(
                '/api/orders/add', 
                order, 
                config );
    
                dispatch({
                    type: ORDER_CREATE_SUCCESS,
                    payload: data
                })
                
                dispatch({
                    type: CART_CLEAR_ITEMS,
                    payload: data
                })

                localStorage.removeItem("cartItems")
                localStorage.removeItem("qty")
    
        }catch(error){
            dispatch({type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail ? 
            error.response.data.detail : error.message,
        })}
    }


    
    
    