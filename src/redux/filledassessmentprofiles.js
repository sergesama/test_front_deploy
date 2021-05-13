import * as ActionTypes from './ActionTypes';

export const Filled_assessment_profiles = (state = {
        isLoading: true,
        errMess: null,
        filled_assessment_profiles: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_FILLED_ASSESSMENT_PROFILES:
            return {...state, isLoading: false, errMess: null, filled_assessment_profiles: action.payload};

        case ActionTypes.FILLED_ASSESSMENT_PROFILES_LOADING:
            return {...state, isLoading: true, errMess: null, filled_assessment_profiles: []};

        case ActionTypes.FILLED_ASSESSMENT_PROFILES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, filled_assessment_profiles: []};

        default:
            return state;
    }
}