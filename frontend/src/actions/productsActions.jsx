import axios from "axios";

import { URL_PRODUCTS } from './URL';

import {

    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,

    PRODUCT_EDIT_REQUEST,
    PRODUCT_EDIT_SUCCESS,
    PRODUCT_EDIT_FAIL,
    PRODUCT_EDIT_RESET,

    PRODUCT_EDIT_IMAGE_REQUEST,
    PRODUCT_EDIT_IMAGE_SUCCESS,
    PRODUCT_EDIT_IMAGE_FAIL,

    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,

} from '../constants/productConsts';

// list

export const listProducts = () => async (dispatch, getState) => {

    try {

        //-------------------- REQUEST --------------------//

        dispatch({ type: PRODUCT_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.get(`${URL_PRODUCTS}/get/`, config);

        //-------------------- SUCCESS --------------------//

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        });

        //-------------------- FAIL --------------------//

    } catch (error) {

        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        });

    };

};

// detail

export const productDetails = (id) => async (dispatch, getState) => {

    try {

        //-------------------- REQUEST --------------------//

        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`${URL_PRODUCTS}/getProduct/${id}/`, config);

        //-------------------- SUCCESS --------------------//

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        });

        //-------------------- FAIL --------------------//

    } catch (error) {

        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });

    };

};

// create 

export const createProducts = (name, description, price, off_sale, discount_percentage) => async (dispatch, getState) => {

    try {

        //-------------------- REQUEST --------------------//

        dispatch({ type: PRODUCT_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.post(
            `${URL_PRODUCTS}/add/`,
            {
                name,
                description,
                price,
                off_sale,
                discount_percentage,
            },
            config
        );

        //-------------------- SUCCESS --------------------//

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data,
        });

        //-------------------- FAIL --------------------//

    } catch (error) {

        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });

    };

};

// edit image

export const editImage = (id, image) => async (dispatch, getState) => {

    try {

        //-------------------- REQUEST --------------------//

        dispatch({ type: PRODUCT_EDIT_IMAGE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const formData = new FormData();
        formData.append('image', image);

        const { data } = await axios.put(
            `${URL_PRODUCTS}/updateImage/${id}/`,
            formData,
            config
        );

        //-------------------- SUCCESS --------------------//

        dispatch({
            type: PRODUCT_EDIT_IMAGE_SUCCESS,
            payload: data,
        });

        //-------------------- FAIL --------------------//

    } catch (error) {

        dispatch({
            type: PRODUCT_EDIT_IMAGE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });

    };

};

// delete

export const deleteProduct = (id) => async (dispatch, getState) => {
    
    try {
        
        //-------------------- REQUEST --------------------//

        dispatch({ type: PRODUCT_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        };

        const { data } = await axios.delete(`${URL_PRODUCTS}/delete/${id}/`, config);

        //-------------------- SUCCESS --------------------//

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
            payload: data
        });

        //-------------------- FAIL --------------------//
    
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    };

};