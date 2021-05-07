import * as ActionTypes from './ActionTypes';

export const Competences = (state = {
        isLoading: true,
        errMess: null,
        competences: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_COMPETENCES:
            return {...state, isLoading: false, errMess: null, competences: action.payload};

        case ActionTypes.COMPETENCES_LOADING:
            return {...state, isLoading: true, errMess: null, competences: []};

        case ActionTypes.COMPETENCES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, competences: []};

        default:
            return state;
    }
}