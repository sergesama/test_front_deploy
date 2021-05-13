import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}
  
export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}
  
export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', response.token);
            localStorage.setItem('userId', response.userId);
            localStorage.setItem('creds', JSON.stringify(creds));
            // Dispatch the success action
            dispatch(fetchCompetences());
            dispatch(fetchCompetenceProfiles());
            dispatch(fetchAsssessments());
            dispatch(fetchAsssessmentProfiles());
            dispatch(fetchFilledAssessmentProfiles());
            dispatch(fetchUsers());
            dispatch(receiveLogin(response));
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(loginError(error.message)))
};

export const requestLogout = (response) => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    localStorage.removeItem('userId');
    dispatch(receiveLogout())
}

export const requestSignup = (creds) => {
    return {
        type: ActionTypes.SIGNUP_REQUEST,
        creds
    }
}
  
export const receiveSignup = (response) => {
    return {
        type: ActionTypes.SIGNUP_SUCCESS,
        token: response.token
    }
}
  
export const signupError = (message) => {
    return {
        type: ActionTypes.SIGNUP_FAILURE,
        message
    }
}

export const signupUser = (creds) => (dispatch) => {
    dispatch(requestSignup(creds))

    return fetch(baseUrl + 'users/signup', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .catch(error => dispatch(signupError(error.message)))
};

//////////////////////////////////////////////////////////////////////////////////
export const postCompetence = (competence) => (dispatch) => {
 
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'competences', {
        method: "POST",
        body: JSON.stringify(competence),
        headers: {
            'Authorization': bearer,
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
            dispatch(fetchCompetences())
            return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => { console.log('Competence', response); alert('Competence successfully Add\n'+JSON.stringify(response)); })
    .catch(error =>  { console.log('Competence', error.message); alert('Your Competence could not be posted\nError: '+error.message); });
};


export const fetchCompetences = () => (dispatch) => {
    dispatch(competencesLoading(true));
    
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'competences', {
        method: "GET",
        headers: {
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(competences => dispatch(addCompetences(competences)))
    .catch(error => dispatch(competencesFailed(error.message)));
}

export const competencesLoading = () => ({
    type: ActionTypes.COMPETENCES_LOADING
});

export const competencesFailed = (errmess) => ({
    type: ActionTypes.COMPETENCES_FAILED,
    payload: errmess
});

export const addCompetences = (competences) => ({
    type: ActionTypes.ADD_COMPETENCES,
    payload: competences
});

///////////////////////////////////////////////////////////////////////////////////////

export const postCompetenceProfile = (competence) => (dispatch) => {
 
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'competence_profiles', {
        method: "POST",
        body: JSON.stringify(competence),
        headers: {
            'Authorization': bearer,
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
            dispatch(fetchCompetenceProfiles())
            return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => { console.log('Competence profile', response); alert('Competence profile successfully Add\n'+JSON.stringify(response)); })
    .catch(error =>  { console.log('Competence profile', error.message); alert('Your Competence profile could not be posted\nError: '+error.message); });
};


export const fetchCompetenceProfiles = () => (dispatch) => {
    dispatch(CompetenceProfilesLoading(true));
    
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'competence_profiles', {
        method: "GET",
        headers: {
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(competence_profile => dispatch(addCompetenceProfiles(competence_profile)))
    .catch(error => dispatch(CompetenceProfilesFailed(error.message)));
}

export const CompetenceProfilesLoading = () => ({
    type: ActionTypes.COMPETENCE_PROFILES_LOADING
});

export const CompetenceProfilesFailed = (errmess) => ({
    type: ActionTypes.COMPETENCE_PROFILES_FAILED,
    payload: errmess
});

export const addCompetenceProfiles = (competence_profile) => ({
    type: ActionTypes.ADD_COMPETENCE_PROFILES,
    payload: competence_profile
});

///////////////////////////////////////////////////////////////////////////////

export const fetchUsers = () => (dispatch) => {
    dispatch(UsersLoading(true));
    
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'users', {
        method: "GET",
        headers: {
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(users => dispatch(addUsers(users)))
    .catch(error => dispatch(UsersFailed(error.message)));
}

export const UsersLoading = () => ({
    type: ActionTypes.USERS_LOADING
});

export const UsersFailed = (errmess) => ({
    type: ActionTypes.USERS_FAILED,
    payload: errmess
});

export const addUsers = (user) => ({
    type: ActionTypes.ADD_USERS,
    payload: user
});

/////////////////////////////////////////////////////////////////////////////////////////////

export const postAssessment = (assessment) => (dispatch) => {
 
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'assessments', {
        method: "POST",
        body: JSON.stringify(assessment),
        headers: {
            'Authorization': bearer,
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
            dispatch(fetchAsssessmentProfiles())
            dispatch(fetchAsssessments())
            return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => { console.log('Asssessment', response); alert('Asssessment successfully Add\n'+JSON.stringify(response)); })
    .catch(error =>  { console.log('Asssessment', error.message); alert('Your Asssessment could not be posted\nError: '+error.message); });
};

export const fetchAsssessments = () => (dispatch) => {
    dispatch(AsssessmentsLoading(true));
    
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'assessments', {
        method: "GET",
        headers: {
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(users => dispatch(addAsssessments(users)))
    .catch(error => dispatch(AsssessmentsFailed(error.message)));
}

export const AsssessmentsLoading = () => ({
    type: ActionTypes.ASSESSMENTS_LOADING
});

export const AsssessmentsFailed = (errmess) => ({
    type: ActionTypes.ASSESSMENTS_FAILED,
    payload: errmess
});

export const addAsssessments = (user) => ({
    type: ActionTypes.ADD_ASSESSMENTS,
    payload: user
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchAsssessmentProfiles = () => (dispatch) => {
    dispatch(AsssessmentProfilesLoading(true));
    
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'assessment_profiles', {
        method: "GET",
        headers: {
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(users => dispatch(addAsssessmentProfiles(users)))
    .catch(error => dispatch(AsssessmentProfilesFailed(error.message)));
}

export const AsssessmentProfilesLoading = () => ({
    type: ActionTypes.ASSESSMENT_PROFILES_LOADING
});

export const AsssessmentProfilesFailed = (errmess) => ({
    type: ActionTypes.ASSESSMENT_PROFILES_FAILED,
    payload: errmess
});

export const addAsssessmentProfiles = (user) => ({
    type: ActionTypes.ADD_ASSESSMENT_PROFILES,
    payload: user
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const postFillAssessmentProfile = (assessment) => (dispatch) => {
 
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'fillassessmentprofiles', {
        method: "POST",
        body: JSON.stringify(assessment),
        headers: {
            'Authorization': bearer,
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
            dispatch(fetchAsssessmentProfiles())
            dispatch(fetchFilledAssessmentProfiles())
            return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => { console.log('FillAssessmentProfile', response); alert('FillAssessmentProfile successfully Add\n'+JSON.stringify(response)); })
    .catch(error =>  { console.log('FillAssessmentProfile', error.message); alert('Your FillAssessmentProfile could not be posted\nError: '+error.message); });
};


export const fetchFilledAssessmentProfiles = () => (dispatch) => {
    dispatch(FilledAssessmentProfilesLoading(true));
    
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'fillassessmentprofiles', {
        method: "GET",
        headers: {
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(users => dispatch(addFilledAssessmentProfiles(users)))
    .catch(error => dispatch(FilledAssessmentProfilesFailed(error.message)));
}

export const FilledAssessmentProfilesLoading = () => ({
    type: ActionTypes.FILLED_ASSESSMENT_PROFILES_LOADING
});

export const FilledAssessmentProfilesFailed = (errmess) => ({
    type: ActionTypes.FILLED_ASSESSMENT_PROFILES_FAILED,
    payload: errmess
});

export const addFilledAssessmentProfiles = (user) => ({
    type: ActionTypes.ADD_FILLED_ASSESSMENT_PROFILES,
    payload: user
});
