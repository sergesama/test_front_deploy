import * as ActionTypes from './ActionTypes';

export const Assessment_profiles = (state = {
        isLoading: true,
        errMess: null,
        assessment_profiles: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_ASSESSMENT_PROFILES:
            return {...state, isLoading: false, errMess: null, assessment_profiles: action.payload};

        case ActionTypes.ASSESSMENT_PROFILES_LOADING:
            return {...state, isLoading: true, errMess: null, assessment_profiles: []};

        case ActionTypes.ASSESSMENT_PROFILES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, assessment_profiles: []};

        default:
            return state;
    }
}