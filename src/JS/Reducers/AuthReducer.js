import { CURRENT_USER, FAIL_AUTH, GET_ONE, LOAD_AUTH, LOGIN_AUTH, LOGOUT_USER, REGISTER_AUTH ,SUCCESS_AUTH } from "../ActionTypes/AuthTypes";

const initialState={
    errors: null,
    load: false,
    success: null,
    user:null,
    isAuth:false,
    token:null
}

const AuthReducer = ( state = initialState , {type , payload} ) => {

    switch (type) {
        case LOAD_AUTH:
            return {
                ...state , load:true
            }
        case REGISTER_AUTH:
            return{
               ...state , success:payload.success.msg , load: false , isAuth:false, user:payload.success.user
            }
        case SUCCESS_AUTH:
            localStorage.setItem("user", JSON.stringify(payload.success.user));
            return {
                ...state , success:payload.success.msg , load:false , user:JSON.parse(localStorage.getItem("user"))
            }
        case GET_ONE:
            localStorage.setItem("user" , JSON.stringify(payload.success.user))
            return {
                ...state , success: payload.success.msg , load:false , user:JSON.parse(localStorage.getItem("user"))
            }
        case LOGIN_AUTH:
            localStorage.setItem("token", payload.success.token);
            localStorage.setItem("user", JSON.stringify(payload.success.user));
            return{
                ...state , success:payload.success , load: false , isAuth:true, user:payload.success.user , token:localStorage.getItem("token")
            }
        case CURRENT_USER:
            return{
                ...state, user:payload.user , isAuth :true , load:false , token:payload.token
            }
        case LOGOUT_USER:
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            return{
                ...state , load:false , isAuth:false ,user:null , errors:null , token: null , success:{msg: "Successfully logged out"}
            }
        case FAIL_AUTH:
            return{
                ...state  , success:null , load:false , errors : payload.message , isAuth:false , user:null
            }
        default:
            return state;
    }

}

export default AuthReducer;
