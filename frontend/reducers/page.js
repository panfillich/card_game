import {
    SET_YEAR,
    GET_PHOTOS_REQUEST,
    GET_PHOTOS_SUCCESS } from '../constants/Page'

const initialState = {
    year: 2016,
    photos: [],
    fetching: false
}

/*export default function page(state = initialState) {
    return state
}*/

export default function page(state = initialState, action) {

    switch (action.type) {
        case SET_YEAR:
            let result_state = {
                state,
                year: action.payload,
                photos: state.photos };
            return result_state;

        case GET_PHOTOS_REQUEST:
            return { state,
                    year: action.payload,
                    photos: state.photos,
                    fetching: true }

        case GET_PHOTOS_SUCCESS:
            return { state,
                    year: state.year,
                    photos: action.payload,
                    fetching: false }

        default:
            return state;
    }
}

