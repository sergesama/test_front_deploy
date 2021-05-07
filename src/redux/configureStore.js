import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms,combineForms } from 'react-redux-form';
import { Dishes } from './dishes';
import { Books } from './books';
import { Competences } from './competences';
import { Competence_profiles } from './competenceprofiles';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import { favorites } from './favorites';
import { Auth } from './auth';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialCompetence,InitialCompetenceProfile } from './forms';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            books: Books,
            competences: Competences,
            competence_profiles: Competence_profiles,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            auth: Auth,
            favorites: favorites,
            myForms: combineForms({
                competence: InitialCompetence,
                competence_profile: InitialCompetenceProfile
              }, 'myForms'),
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}