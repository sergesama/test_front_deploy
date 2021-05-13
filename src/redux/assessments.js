import * as ActionTypes from './ActionTypes';

export const Assessments = (state = {
        isLoading: true,
        errMess: null,
        assessments: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_ASSESSMENTS:
            return {...state, isLoading: false, errMess: null, assessments: action.payload};

        case ActionTypes.ASSESSMENTS_LOADING:
            return {...state, isLoading: true, errMess: null, assessments: []};

        case ActionTypes.ASSESSMENTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, assessments: []};

        default:
            return state;
    }
}