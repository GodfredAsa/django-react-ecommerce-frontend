import axios from 'axios'
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_RESET,
    USER_DETAILS_FAIL,

    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET

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
    dispatch({type: USER_DETAILS_RESET})
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


export const GetUserDetails = (id) => async (dispatch, getState) =>{
    try{
        dispatch({type: USER_DETAILS_REQUEST});

        // getting the login user
        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers: {'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
        };

        // the value of id refers to profile. value of id will just say profile
        const {data} = await axios.get(`/api/users/${id}`, config )

            dispatch({
                type: USER_DETAILS_SUCCESS,
                payload: data
            })

    }catch(error){
        dispatch({type: USER_DETAILS_FAIL,
        payload: error.response && error.response.data.detail ? 
        error.response.data.detail : error.message,
    })}
}

export const UpdateUserProfile = (user) => async (dispatch, getState) =>{
    try{
        dispatch({type: USER_UPDATE_PROFILE_REQUEST});

        // getting the login user
        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers: {'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
        };

        // the value of id refers to profile. value of id will just say profile
        const {data} = await axios.put(
            `/api/users/profile/update`, 
            user, 
            config );

            dispatch({
                type: USER_UPDATE_PROFILE_SUCCESS,
                payload: data
            })

            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data
            })

            localStorage.setItem('userInfo', JSON.stringify(data))

    }catch(error){
        dispatch({type: USER_UPDATE_PROFILE_FAIL,
        payload: error.response && error.response.data.detail ? 
        error.response.data.detail : error.message,
    })}
}


 

