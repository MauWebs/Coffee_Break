// redux
import { createStore, combineReducers, applyMiddleware } from 'redux';

// thunks
import thunk from 'redux-thunk';

// redux devtools
import { composeWithDevTools } from 'redux-devtools-extension';

// Import Reducers //
import {
    userLoginReducer,
    userRegisterReducer,
    userEditReducer
} from './reducers/userReducers';

import {
    listProductsReducer,
    productDetailsReducer,
    createProductsReducer,
    editImageReducer,
    deleteProductReducer,
} from './reducers/productsReducers';

//--------------------- Combine Reducers ---------------------//

const reducer = combineReducers({

    //USERS
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userEdit: userEditReducer,

    //PRODUCTS
    listProducts: listProductsReducer,
    productDetails: productDetailsReducer,
    createProducts: createProductsReducer,
    editImage: editImageReducer,
    deleteProduct: deleteProductReducer,

});

//--------------------- User Info (Local Storage) ---------------------//

const userInfoStoage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null;

//--------------------- Initial State ---------------------//

const initialState = {
    userLogin: { userInfo: userInfoStoage }
};

//--------------------- Store ---------------------//

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;