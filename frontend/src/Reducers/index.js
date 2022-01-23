import { combineReducers } from "redux";
import headerInputReducer from "./headerInputReducer";
import switchValueReducer from "./switchValueReducer";
const allReducers = combineReducers({
    headerInputReducer,
    switchValueReducer
})

export default allReducers;

