
// third party
import {combineReducers} from "redux";
// project import
import mainReducer from "./menu";

// combine multiple Reducer
export const rootReducer = combineReducers({mainReducer})