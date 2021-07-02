import { combineReducers } from "redux";
import productReducer from './product';
import cartReducer from './cart';

const entitiesReducer = combineReducers({
    products: productReducer,
    carts: cartReducer,
})

export default combineReducers({
    entities: entitiesReducer
})