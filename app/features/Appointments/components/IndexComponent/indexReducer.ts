import { TYPES } from './enum'
import type { Appointment } from "~/types/features";

type State = {
    originalAppointmentList?: Appointment[],
    appointmentSort?: Appointment[],
    typeSort?: string,
    search?: string,
    loading?: boolean,
}

type Action =
 | { type: TYPES.FETCH_LOADING }
 | { type: TYPES.FETCH_START, payload: Appointment[] }
 | { type: TYPES.FETCH_ORIGINAL_LIST, payload: Appointment[] }
 | { type: TYPES.FETCH_SORT_LIST, payload:  Appointment[] }
 | { type: TYPES.FETCH_SEARCH, payload: string }
 | { type: TYPES.FETCH_SORT_TYPE, payload: string }

export const INITIAL_STATE: State = {
    originalAppointmentList: [],
    appointmentSort: [],
    typeSort: "",
    search: "",
    loading: false,
}

export const indexReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case TYPES.FETCH_START:
            return { ...state, appointmentSort: action.payload}
        case TYPES.FETCH_LOADING:
            return { ...state, loading: !state.loading }
        case TYPES.FETCH_ORIGINAL_LIST:
            return { ...state, originalAppointmentList: [...action.payload] }
        case TYPES.FETCH_SORT_LIST:
            return { ...state, appointmentSort: [...action.payload] }
        case TYPES.FETCH_SEARCH:
            return { ...state, search: action.payload }
        case TYPES.FETCH_SORT_TYPE:
            return { ...state, typeSort: action.payload }
        default:
            return state;
    }
}