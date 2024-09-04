import api from "../../API/Api";
import { CURRENT_USER, FAIL_AUTH, LOAD_AUTH, LOGIN_AUTH, REGISTER_AUTH , LOGOUT_USER, SUCCESS_AUTH, GET_ONE } from "../ActionTypes/AuthTypes";

export const register = (newUser ,navigate) => async (dispatch) => {
        dispatch({ type: LOAD_AUTH });
    try {
        const result = await api.post("/regist", newUser);
        console.log(result)
        dispatch({ type: REGISTER_AUTH, payload: result.data });
        navigate('/')
    } catch (error) {
        dispatch({ type: FAIL_AUTH, payload: error });
        console.log(error)
    }
}

export const login = (user , navigate) => async (dispatch) => {
    dispatch({ type: LOAD_AUTH });
    try {
        const result = await api.post("/login", user);
        console.log(result.data)
       await  dispatch({ type: LOGIN_AUTH, payload: result.data });
        result.data.success.user &&
        navigate(`/prof/${result.data.success.user._id}`);
    } catch (error) {
        dispatch({ type: FAIL_AUTH, payload: error });
    }
}



export const current = (navigate) => async (dispatch) => {
    dispatch({ type: LOAD_AUTH });
    try {
        let user = JSON.parse(localStorage.getItem("user"));
        let token = localStorage.getItem("token");
        if(user){
            dispatch({ type:CURRENT_USER , payload: {user , token}});
        }else{
            navigate('/login')
        }


    } catch (error) {
        dispatch({ type: FAIL_AUTH, payload: error });
    }
};

export const updateProfile = (id, user) => async (dispatch) => {
    dispatch({ type: LOAD_AUTH });
    try {
        const result = await api.put(`/skills/${id}`, user);
        dispatch({ type: SUCCESS_AUTH, payload: result.data });
    } catch (error) {
        dispatch({ type: FAIL_AUTH, payload: error });
    }
}

export const logoutt = (navigate) => async (dispatch) => {
   await dispatch({ type: LOGOUT_USER });
    navigate('/');
}

export const getOne = (id) => async (dispatch) => {
    dispatch({type:LOAD_AUTH})
    try {
        const result = await api.get(`/${id}`)
        dispatch({type:GET_ONE , payload:result.data})
    } catch (error) {
        dispatch({ type: FAIL_AUTH, payload: error });
    }
}
