import { combineReducers } from "redux";
import productReducer from './product';
import cartReducer from './cart';
import authReducer from './auth';
import errorReducer from './error';

const entitiesReducer = combineReducers({
    products: productReducer,
    carts: cartReducer,
})

export default combineReducers({
    error: errorReducer,
    auth: authReducer,
    entities: entitiesReducer
})