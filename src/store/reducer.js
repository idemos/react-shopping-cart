import { combineReducers } from "redux";
import productReducer from './product';
import cartReducer from './cart';
import authReducer from './auth';

const entitiesReducer = combineReducers({
    products: productReducer,
    carts: cartReducer,
})

export default combineReducers({
    auth: authReducer,
    entities: entitiesReducer
})