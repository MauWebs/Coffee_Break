// Axios
import axios from 'axios';

// URL
import { URL_USERS } from './URL';

// userConstants
import {
    
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_EDIT_REQUEST,
    USER_EDIT_SUCCESS,
    USER_EDIT_FAIL,

} from '../constants/userConsts';

// login

export const login = (email, password) => async (dispatch) => {

    try {

        //-------------------- REQUEST --------------------//

        dispatch({ type: USER_LOGIN_REQUEST });

        const config = {
            headers: { 'Content-Type': 'application/json' }
        };

        const { data } = await axios.post(
            `${URL_USERS}/login/`,
            { 'email': email, 'password': password },
            config
        );

        //-------------------- SUCCESS --------------------//

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

        localStorage.setItem('userInfo', JSON.stringify(data));

        //-------------------- FAIL --------------------//

    } catch (error) {

        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        });

    };

};

// logout

export const logout = () => (dispatch) => {

    localStorage.removeItem('userInfo');

    dispatch({ type: USER_LOGOUT });

};

// register

export const register = (user_name, email, password) => async (dispatch) => {

    try {

        //-------------------- REQUEST --------------------//  

        dispatch({ type: USER_REGISTER_REQUEST });

        const config = {
            headers: { 'Content-Type': 'application/json' }
        };

        const { data } = await axios.post(
            `${URL_USERS}/register/`,
            { 'user_name': user_name, 'email': email, 'password': password },
            config
        );

        //-------------------- SUCCESS --------------------//

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

        localStorage.setItem('userInfo', JSON.stringify(data));

        //-------------------- FAIL --------------------//

    } catch (error) {

        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        });

    };

};

// edit

export const userEdit = (user) => async (dispatch, getState) => {

    try {

        //-------------------- REQUEST --------------------//  

        dispatch({ type: USER_EDIT_REQUEST });

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.put(`${URL_USERS}/put/`, user, config);

        //-------------------- SUCCESS --------------------//

        dispatch({
            type: USER_EDIT_SUCCESS,
            payload: data
        });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

    } catch (error) {

        //-------------------- FAIL --------------------//

        dispatch({
            type: USER_EDIT_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,

        });

    };

};