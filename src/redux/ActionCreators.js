import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, comment) => (dispatch) => {

    const newComment = {
        dish: dishId,
        rating: rating,
        comment: comment
    }
    console.log('Comment ', newComment);

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
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
    .then(response => dispatch(addComment(response)))
    .catch(error => { console.log('Post comments ', error.message);
        alert('Your comment could not be posted\nError: '+ error.message); })
}

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
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
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});
export const postBook = (book) => (dispatch) => {
        
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'books', {
        method: "POST",
        body: JSON.stringify(book),
        headers: {
            'Authorization': bearer,
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
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
    .then(response => { console.log('Book', response); alert('Book successfully Add\n'+JSON.stringify(response)); })
    .catch(error =>  { console.log('Book', error.message); alert('Your Book could not be posted\nError: '+error.message); });
};
export const fetchBooks = () => (dispatch) => {
    dispatch(booksLoading(true));

    
    return fetch(baseUrl + 'books')
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
        .then(books => dispatch(addBooks(books)))
        .catch(error => dispatch(booksFailed(error.message)));
}

export const booksLoading = () => ({
    type: ActionTypes.BOOKS_LOADING
});

export const booksFailed = (errmess) => ({
    type: ActionTypes.BOOKS_FAILED,
    payload: errmess
});

export const addBooks = (books) => ({
    type: ActionTypes.ADD_BOOKS,
    payload: books
});
export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
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
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));

    return fetch(baseUrl + 'promotions')
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
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const fetchLeaders = () => (dispatch) => {
    
    dispatch(leadersLoading());

    return fetch(baseUrl + 'leaders')
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
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)));
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

export const postFeedback = (feedback) => (dispatch) => {
        
    return fetch(baseUrl + 'feedback', {
        method: "POST",
        body: JSON.stringify(feedback),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
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
    .then(response => { console.log('Feedback', response); alert('Thank you for your feedback!\n'+JSON.stringify(response)); })
    .catch(error =>  { console.log('Feedback', error.message); alert('Your feedback could not be posted\nError: '+error.message); });
};

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
            dispatch(fetchFavorites());
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
    dispatch(favoritesFailed("Error 401: Unauthorized"));
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

export const postFavorite = (bookid) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'favorites/' + bookid, {
        method: "POST",
        body: JSON.stringify({"_id": bookid}),
        headers: {
          "Content-Type": "application/json",
          'Authorization': bearer
        },
        credentials: "same-origin"
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
    .then(favorites => { console.log('Favorite Added', favorites); dispatch(addFavorites(favorites)); })
    .catch(error => dispatch(favoritesFailed(error.message)));
}

export const deleteFavorite = (bookid) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'favorites/' + bookid, {
        method: "DELETE",
        headers: {
          'Authorization': bearer
        },
        credentials: "same-origin"
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
    .then(favorites => { console.log('Favorite Deleted', favorites); dispatch(addFavorites(favorites)); })
    .catch(error => dispatch(favoritesFailed(error.message)));
};

export const fetchFavorites = () => (dispatch) => {
    dispatch(favoritesLoading(true));
    
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'favorites', {
        method: "GET",
        headers: {
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
            console.log(response)
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
    .then(favorites => dispatch(addFavorites(favorites)))
    .catch(error => dispatch(favoritesFailed(error.message)));
}

export const favoritesLoading = () => ({
    type: ActionTypes.FAVORITES_LOADING
});

export const favoritesFailed = (errmess) => ({
    type: ActionTypes.FAVORITES_FAILED,
    payload: errmess
});

export const addFavorites = (favorites) => ({
    type: ActionTypes.ADD_FAVORITES,
    payload: favorites
});
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
            //dispatch(fetchCompetenceProfiles())
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
            //dispatch(fetchCompetenceProfiles())
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
