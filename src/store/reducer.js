import { combineReducers } from "redux";
import productReducer from './product';

const entitiesReducer = combineReducers({
    product: productReducer
})

export default combineReducers({
    entities: entitiesReducer
})