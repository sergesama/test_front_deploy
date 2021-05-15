import React, { Component } from 'react';
import Header from './HeaderComponent';
import UnAuthenticated from './UnAuthenticatedComponent';
import CreateCompetence from './CreateCompetenceComponent';
import CreateCompetenceProfile from './CreateCompetenceProfileComponent';
import AssessmentStart from './AssessmentStartComponent';
import AssessmentProfilesList from './AssessmentProfilesListComponent';
import AssessmentList from './AssessmentListComponent';
import AssessmentResult from './AssessmentResultComponent';
import AssessmentProfileFill from './AssessmentProfileFillComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
  loginUser, signupUser, logoutUser, fetchUsers,
  postCompetence, fetchCompetences, 
  postCompetenceProfile, fetchCompetenceProfiles,
  postAssessment, fetchAsssessments, 
  fetchAsssessmentProfiles,
  postFillAssessmentProfile, fetchFilledAssessmentProfiles
 } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      books: state.books,
      competences: state.competences,
      competence_profiles: state.competence_profiles,
      assessments: state.assessments,
      assessment_profiles: state.assessment_profiles,
      filled_assessment_profiles: state.filled_assessment_profiles,
      users: state.users,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders,
      favorites: state.favorites,
      auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => ({
  postCompetence: (competence) => dispatch(postCompetence(competence)),
  postCompetenceProfile: (profile) => dispatch(postCompetenceProfile(profile)),
  postAssessment: (assessment) => dispatch(postAssessment(assessment)),
  postFillAssessmentProfile: (assessment) => dispatch(postFillAssessmentProfile(assessment)),
  fetchCompetences: () => {dispatch(fetchCompetences())},
  fetchCompetenceProfiles: () => {dispatch(fetchCompetenceProfiles())},
  fetchAsssessments: () => {dispatch(fetchAsssessments())},
  fetchAsssessmentProfiles: () => {dispatch(fetchAsssessmentProfiles())},
  fetchFilledAssessmentProfiles: () => {dispatch(fetchFilledAssessmentProfiles())},
  fetchUsers: () => {dispatch(fetchUsers())},
  resetCompetenceForm: () => { dispatch(actions.reset('myForms.competence'))},
  resetCompetenceProfileForm: () => { dispatch(actions.reset('myForms.competence_profile'))},
  resetAssessmentForm: () => { dispatch(actions.reset('myForms.assessment'))},
  resetfilledAssessmentProfileForm: () => { dispatch(actions.reset('myForms.filledAssessmentProfiled'))},
  changeForm: (path,value) => { dispatch(actions.change(path,value))},
  removeForm: (path,index) => { dispatch(actions.remove(path,index))},
  loginUser: (creds) => dispatch(loginUser(creds)),
  signupUser: (creds) => dispatch(signupUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
});

class Main extends Component {

  componentDidMount() {
    this.props.fetchCompetences();
    this.props.fetchCompetenceProfiles();
    this.props.fetchAsssessments();
    this.props.fetchAsssessmentProfiles();
    this.props.fetchFilledAssessmentProfiles();
    this.props.fetchUsers();
  }

  render() {
    const ProfileWithId = ({match}) => {
      return(
        <AssessmentProfileFill 
        assessment_profile={this.props.assessment_profiles.assessment_profiles.filter((assessment_profile) => assessment_profile._id === match.params.assessmentProfileId )[0]}
        isLoading={this.props.assessment_profiles.isLoading}
        errMess={this.props.assessment_profiles.errMess}
        changeForm={this.props.changeForm}
        postFillAssessmentProfile={this.props.postFillAssessmentProfile}
        resetfilledAssessmentProfileForm={this.props.resetfilledAssessmentProfileForm}
        />
      );
    }
    const AssessmentWithId = ({match}) => {
      return(
        <AssessmentResult 
        assessment={this.props.assessments.assessments.filter((assessment) => assessment._id === match.params.assessmentId )[0]}
        filled_assessment_profiles={this.props.filled_assessment_profiles.filled_assessment_profiles.filter((filled_assessment_profile) => filled_assessment_profile.assessmentId._id === match.params.assessmentId )}
        assessment_profiles={this.props.assessment_profiles.assessment_profiles.filter((assessment_profile) => assessment_profile.assessment._id === match.params.assessmentId)}
        isLoading={this.props.assessments.isLoading}
        errMess={this.props.assessments.errMess}
        />
      );
    }
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.props.auth.isAuthenticated
          ? <Component {...props} />
          : <Redirect to={{
              pathname: '/unauthenticated',
              state: { from: props.location }
            }} />
      )} />
    );
    const AdminRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.props.auth.isAuthenticated
        
          ? (this.props.auth.isAdmin ? <Component {...props} /> : <Redirect to={{pathname: '/assessments',state: { from: props.location }}} />)
          : <Redirect to={{
              pathname: '/unauthenticated',
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
              <Route exact path="/unauthenticated" component={() => <UnAuthenticated />} />
              <PrivateRoute exact path="/assessments" component={() => <AssessmentList assessments={this.props.assessments} />} />
              <PrivateRoute exact path="/assessment_profile" component={() => <AssessmentProfilesList assessment_profiles={this.props.assessment_profiles} />} />
              <PrivateRoute path="/assessment_profile/:assessmentProfileId" component={ProfileWithId} />
              <PrivateRoute path="/assessments/:assessmentId" component={AssessmentWithId} />
              <AdminRoute exact path="/create_competence" component={() => <CreateCompetence resetCompetenceForm={this.props.resetCompetenceForm} postCompetence={this.props.postCompetence} changeForm={this.props.changeForm} />} />
              <AdminRoute exact path="/create_competence_profile" component={() => <CreateCompetenceProfile  competences={this.props.competences} resetCompetenceProfileForm={this.props.resetCompetenceProfileForm} postCompetenceProfile={this.props.postCompetenceProfile} changeForm={this.props.changeForm} removeForm={this.props.removeForm} />} />
              <AdminRoute exact path="/assessment_start" component={() => <AssessmentStart  competence_profiles={this.props.competence_profiles} users={this.props.users} postAssessment={this.props.postAssessment} resetAssessmentForm={this.props.resetAssessmentForm} changeAssessmentForm={this.props.changeForm} />} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
