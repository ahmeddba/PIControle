import { combineReducers } from "redux";
import  recruitReducer  from "./RecruiterReducer";
import AuthReducer  from "./AuthReducer";
import InterviewReducer from "./InterviewReducer";

const rootReducer = combineReducers({recruitReducer , AuthReducer , InterviewReducer });

export default rootReducer;
