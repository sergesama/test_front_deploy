import { createStore, combineReducers, applyMiddleware } from 'redux';
import { combineForms } from 'react-redux-form';
import { Competences } from './competences';
import { Competence_profiles } from './competenceprofiles';
import { Assessments } from './assessments';
import { Assessment_profiles } from './assessmentprofiles';
import { Filled_assessment_profiles } from './filledassessmentprofiles';
import { Users } from './users';
import { Auth } from './auth';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialCompetence, InitialCompetenceProfile, InitialAssessment, InitialfilledAssessmentProfiled } from './forms';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            competences: Competences,
            competence_profiles: Competence_profiles,
            assessments: Assessments,
            assessment_profiles: Assessment_profiles,
            filled_assessment_profiles: Filled_assessment_profiles,
            users: Users,
            auth: Auth,
            myForms: combineForms({
                competence: InitialCompetence,
                competence_profile: InitialCompetenceProfile,
                assessment: InitialAssessment,
                filledAssessmentProfiled: InitialfilledAssessmentProfiled,
              }, 'myForms'),
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}