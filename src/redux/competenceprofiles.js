import * as ActionTypes from './ActionTypes';

export const Competence_profiles = (state = {
        isLoading: true,
        errMess: null,
        competence_profiles: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_COMPETENCE_PROFILES:
            return {...state, isLoading: false, errMess: null, competence_profiles: action.payload};

        case ActionTypes.COMPETENCE_PROFILES_LOADING:
            return {...state, isLoading: true, errMess: null, competence_profiles: []};

        case ActionTypes.COMPETENCE_PROFILES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, competence_profiles: []};

        default:
            return state;
    }
}