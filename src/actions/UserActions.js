import axios from 'axios'
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL
} from '../constants/UserConstants'


const Login = (email, password) => async (dispatch) =>{
    try{
        dispatch({type: USER_LOGIN_REQUEST})

        const config = {
            headers: {'Content-Type': 'application/json'}
        }
        const {data} = await axios.post(
            '/api/users/login',
            {'username': email, 'password': password}, config
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

// LOG OUT ACTIONS 
export const Logout = () => async (dispatch) =>{
    localStorage.removeItem("userInfo");
    dispatch({type: USER_LOGOUT})
}

// REGISTER ACTIONS 
export const Register = (name, email, password) => async (dispatch) =>{
    try{
        dispatch({type: USER_REGISTER_REQUEST});

        const config = {
            headers: {'Content-Type': 'application/json'}
        };

        const {data} = await axios.post('/api/users/register',
            {'name': name, 'email': email, 'password': password, }, config
            )

            // after registration is successful we automatically login the user 
            // on the second dispatch action
            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: data
            })

            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data
            })

            localStorage.setItem('userInfo', JSON.stringify(data))

    }catch(error){
        dispatch({type: USER_REGISTER_FAIL,
        payload: error.response && error.response.data.detail ? 
        error.response.data.detail : error.message,
    })}
}
 
// export default Register;

