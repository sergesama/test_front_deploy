import React, { Component } from 'react';
import Header from './HeaderComponent';
import CreateCompetence from './CreateCompetenceComponent';
import CreateCompetenceProfile from './CreateCompetenceProfileComponent';
import AssessmentStart from './AssessmentStartComponent';
import AssessmentProfilesList from './AssessmentProfilesListComponent';
import AssesmentFill from './AssessmentProfileFill';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, postFeedback,
  fetchDishes, 
  postBook, fetchBooks,
  fetchComments,
  fetchPromos,
  loginUser, signupUser, logoutUser, fetchUsers,
  fetchFavorites, postFavorite, deleteFavorite,
  postCompetence, fetchCompetences, 
  postCompetenceProfile, fetchCompetenceProfiles,
  postAssessment, fetchAsssessmentProfiles,
  postFillAssessmentProfile
 } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      books: state.books,
      competences: state.competences,
      competence_profiles: state.competence_profiles,
      assessment_profiles: state.assessment_profiles,
      users: state.users,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders,
      favorites: state.favorites,
      auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, comment) => dispatch(postComment(dishId, rating, comment)),
  postBook: (book) => dispatch(postBook(book)),
  postCompetence: (competence) => dispatch(postCompetence(competence)),
  postCompetenceProfile: (profile) => dispatch(postCompetenceProfile(profile)),
  postAssessment: (assessment) => dispatch(postAssessment(assessment)),
  postFillAssessmentProfile: (assessment) => dispatch(postFillAssessmentProfile(assessment)),
  fetchDishes: () => {dispatch(fetchDishes())},
  fetchBooks: () => {dispatch(fetchBooks())},
  fetchCompetences: () => {dispatch(fetchCompetences())},
  fetchCompetenceProfiles: () => {dispatch(fetchCompetenceProfiles())},
  fetchAsssessmentProfiles: () => {dispatch(fetchAsssessmentProfiles())},
  fetchUsers: () => {dispatch(fetchUsers())},
  resetCompetenceForm: () => { dispatch(actions.reset('myForms.competence'))},
  resetCompetenceProfileForm: () => { dispatch(actions.reset('myForms.competence_profile'))},
  resetAssessmentForm: () => { dispatch(actions.reset('myForms.assessment'))},
  resetfilledAssessmentProfileForm: () => { dispatch(actions.reset('myForms.filledAssessmentProfiled'))},
  changeForm: (path,value) => { dispatch(actions.change(path,value))},
  resetBookForm: () => { dispatch(actions.reset('book'))},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  postFeedback: (feedback) => dispatch(postFeedback(feedback)),
  loginUser: (creds) => dispatch(loginUser(creds)),
  signupUser: (creds) => dispatch(signupUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
  fetchFavorites: () => dispatch(fetchFavorites()),
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
});

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchBooks();
    this.props.fetchCompetences();
    this.props.fetchCompetenceProfiles();
    this.props.fetchAsssessmentProfiles();
    this.props.fetchUsers();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchFavorites();
  }

  render() {
    const ProfileWithId = ({match}) => {
      return(
        <AssesmentFill assessment_profile={this.props.assessment_profiles.assessment_profiles.filter((assessment_profile) => assessment_profile._id === match.params.assessmentProfileId )[0]}
        isLoading={this.props.assessment_profiles.isLoading}
        errMess={this.props.assessment_profiles.errMess}
        changeForm={this.props.changeForm}
        postFillAssessmentProfile={this.props.postFillAssessmentProfile}
        resetfilledAssessmentProfileForm={this.props.resetfilledAssessmentProfileForm}
        />
      );
    }
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.props.auth.isAuthenticated
          ? <Component {...props} />
          : <Redirect to={{
              pathname: '/menu',
              state: { from: props.location }
            }} />
      )} />
    );
    return (
      <div>
        <Header auth={this.props.auth} 
          loginUser={this.props.loginUser} 
          logoutUser={this.props.logoutUser} 
          signupUser={this.props.signupUser} 
          />   
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
              <Route exact path="/assessment_profile" component={() => <AssessmentProfilesList assessment_profiles={this.props.assessment_profiles} />} />
              <Route path="/assessment_profile/:assessmentProfileId" component={ProfileWithId} />
              <Route exact path="/create_competence" component={() => <CreateCompetence resetCompetenceForm={this.props.resetCompetenceForm} postCompetence={this.props.postCompetence} changeForm={this.props.changeForm} />} />
              <Route exact path="/create_competence_profile" component={() => <CreateCompetenceProfile  competences={this.props.competences} resetCompetenceProfileForm={this.props.resetCompetenceProfileForm} postCompetenceProfile={this.props.postCompetenceProfile} changeForm={this.props.changeForm} />} />
              <Route exact path="/assessment_start" component={() => <AssessmentStart  competence_profiles={this.props.competence_profiles} users={this.props.users} postAssessment={this.props.postAssessment} resetAssessmentForm={this.props.resetAssessmentForm} changeAssessmentForm={this.props.changeForm} />} />

            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
