import Api from "../../API/GlobalApi"
import { FAIL_FAVORITES, LOAD_FAVORITES, SUCCESS_FAVORITE } from "../ActionTypes/ApplicationTypes"

export const addFavorite = (id , idJ) => async (dispatch) => {
    dispatch({type: LOAD_FAVORITES})
    try {
        const result = await Api.post(`/addFavorite/${id}/${idJ}`)
        dispatch({type: SUCCESS_FAVORITE , payload: result.data})
    } catch (error) {
        dispatch({type: FAIL_FAVORITES , payload: error.message})
    }
}
