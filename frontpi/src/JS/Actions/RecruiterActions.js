import api from "../../API/GlobalApi";
import { FAIL_COMPANIES, FAIL_JOB_OFFERS, GET_COMPANY, LOAD_COMPANIES, LOAD_JOB_OFFERS, SUCCESS_COMPANIES, SUCCESS_JOB_OFFERS } from "../ActionTypes/RecruiterTypes";
import { getOne } from "./AuthActions";

export const addCompany = (id , company) => async (dispatch) => {
        dispatch({ type: LOAD_COMPANIES });
try {
        const result = await api.post(`/company/createCompany/${id}` , company);
        dispatch({type: SUCCESS_COMPANIES, payload:result.data});
        getOne(id);
} catch (error) {
        dispatch({type: FAIL_COMPANIES, payload:error});
}

}

export const getCompany = (id) => async (dispatch) => {
        dispatch({ type: LOAD_COMPANIES });
    try {
        const result = await api.get(`/company/getCompany/${id}`);
        dispatch({ type: GET_COMPANY, payload: result.data });
    } catch (error) {
        dispatch({ type: FAIL_COMPANIES, payload: error });
    }
}

export const getCompanies = () => async (dispatch) => {
        dispatch({type:LOAD_COMPANIES});
    try {
        const result = await api.get('/company/getCompanies');
        dispatch({type:SUCCESS_COMPANIES , payload:result.data});
    } catch (error) {
        dispatch({type:FAIL_COMPANIES , payload:error});
    }
}
export const addJobOffer = (jobOffer , idH , idC) => (dispatch) => {
    dispatch({type:LOAD_JOB_OFFERS});
    try {
        const result = api.post(`/job/create/${idC}/${idH}`, jobOffer);
        dispatch({type:SUCCESS_JOB_OFFERS , payload:result.data});
        getJobOffers(idH);
    } catch (error) {
        dispatch({type:FAIL_JOB_OFFERS , payload:error});
    }
}

export const getJobOffers = (idH) => async (dispatch) => {
    dispatch({type:LOAD_COMPANIES})
    try {
        const result = await api.get(`/job/get/${idH}`);
        dispatch({type:SUCCESS_JOB_OFFERS , payload:result.data});
    } catch (error) {
        dispatch({type:FAIL_COMPANIES , payload:error});
    }
}

export const deleteJob = (id ) => async (dispatch) => {
    dispatch({type:LOAD_COMPANIES})
    try {
        const result =await  api.delete(`/job/delete/${id}`)
    } catch (error) {
        dispatch({type:FAIL_COMPANIES , payload:error})
    }
}
