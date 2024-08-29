import { FAIL_INTERVIEWS, LOAD_INTERVIEWS, SUCCESS_INTERVIEWS } from "../ActionTypes/InterviewTypes"

const initialState={
    errors: null,
    load: false,
    success: null,
    interview:null,
    interviews:[]
}


const InterviewReducer = ( state = initialState , {type , payload} ) => {

switch(type){
    case LOAD_INTERVIEWS:
        return {
            ...state , load:true , errors:null , success:null , interview:null , interviews :[]
        }
    case SUCCESS_INTERVIEWS:
        return {
            ...state , load:false,
            interviews:payload.success.interviews || [],
            interview:payload.success.interview || null,
            success:payload.success.msg
        }
    case FAIL_INTERVIEWS:
        return {
            ...state , load:false , errors:payload
        }
    default:
        return state;
}

}

export default InterviewReducer;
