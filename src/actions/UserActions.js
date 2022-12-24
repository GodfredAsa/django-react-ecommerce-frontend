import axios from 'axios'
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT
} from '../constants/UserConstants'


const Login = (username, password) => async (dispatch) =>{
    try{
        dispatch({type: USER_LOGIN_REQUEST})

        const config = {
            headers: {'Content-Type': 'application/json'}
        }
        const {data} = await axios.post(
            '/api/users/login',
            {'username': username, 'password': password}, config
            )

            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data
            })

            localStorage.setItem('userInfo', JSON.stringify(data))

    }catch(error){
        dispatch({type: USER_LOGIN_FAIL,
        payload: error.response && error.response.data.detail ? 
        error.response.data.detail : error.message,
    })}
}
 
export default Login;

export const Logout = () => async (dispatch) =>{
    localStorage.removeItem("userInfo");
    dispatch({type: USER_LOGOUT})
}