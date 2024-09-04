import api from "../../API/GlobalApi";
import { FAIL_INTERVIEWS, LOAD_INTERVIEWS, SUCCESS_INTERVIEWS } from "../ActionTypes/InterviewTypes";



export const getInterviews = (idH) => async (dispatch) => {
    dispatch({type:LOAD_INTERVIEWS})
    try {
        const result = await api.get(`/interv/hr/${idH}`);
        dispatch({type:SUCCESS_INTERVIEWS , payload:result.data});
    } catch (error) {
        dispatch({type:FAIL_INTERVIEWS , payload:error});
    }
}

export const addInterview = (interview , idH , idJ , navigate) => async (dispatch) => {
    dispatch({type:LOAD_INTERVIEWS})
    try {
        const result = await api.post(`/interv/${idH}/${idJ}` , interview);
        dispatch({type:SUCCESS_INTERVIEWS , payload:result.data});
        getInterviews(idH);
    } catch (error) {
        dispatch({type:FAIL_INTERVIEWS , payload:error});
    }

}

export const updateInterv = (status , id ) => async (dispatch)  => {
    dispatch({type:LOAD_INTERVIEWS})
    try {
        const result = await api.put(`/interv/${id}` , status);
        dispatch({type:SUCCESS_INTERVIEWS , payload:result.data});
    } catch (error) {
        dispatch({type:FAIL_INTERVIEWS , payload:error});
    }
}
