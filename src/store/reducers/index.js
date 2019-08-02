import { combineReducers } from "redux";
import search from "./search";
const rootReducers = combineReducers({
  search: search
});

export default rootReducers;
