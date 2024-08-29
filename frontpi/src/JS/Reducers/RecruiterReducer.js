import { FAIL_COMPANIES, GET_COMPANY, LOAD_COMPANIES, SUCCESS_COMPANIES, SUCCESS_JOB_OFFERS } from "../ActionTypes/RecruiterTypes";

const initialState={
    errors: null,
    load: false,
    success: null,
    company:null,
    companies:[],
    jobOffer:null,
    jobOffers:[],
    recruiters:[]
}

const RecruiterReducer = ( state = initialState , {type , payload} ) => {

    switch (type) {
        case LOAD_COMPANIES:
            return {
                ...state , load:true , errors:null , success:null
            }
        case SUCCESS_COMPANIES:
            return {
            ...state , load:false , companies:payload.success.companies || [] , company : payload.success.company || null,
             jobOffers:payload.success.jobOffers || [] , recruiters:payload.success.recruiters || [], jobOffer:payload.success.jobOffer || null
        }
        case FAIL_COMPANIES:
            return{
                ...state , load:false , errors:payload
            }
        case GET_COMPANY:
            return {
                ...state , load:false , company:payload.success.company  , success: payload.success.msg
            }
        case SUCCESS_JOB_OFFERS:
            return {
                ...state , load:false , jobOffers:payload.success.jobOffers || [] , jobOffer:payload.success.jobOffer || null,
                success:payload.success.msg
            }
        default:
            return state;
    }

}

export default RecruiterReducer;
