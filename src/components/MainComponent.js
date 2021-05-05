import React, { Component } from 'react';
import Menu from './MenuComponent';
import BookDetail from './BookdetailComponent';
import AddBook from './AddBookComponent';
import Favorites from './FavoriteComponent';
import Header from './HeaderComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, postFeedback, fetchDishes, fetchBooks, fetchComments, fetchPromos, fetchLeaders, loginUser, signupUser, logoutUser, fetchFavorites, postFavorite, deleteFavorite,postBook } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      books: state.books,
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
  fetchDishes: () => {dispatch(fetchDishes())},
  fetchBooks: () => {dispatch(fetchBooks())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  resetBookForm: () => { dispatch(actions.reset('book'))},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchLeaders: () => dispatch(fetchLeaders()),
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
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
    this.props.fetchFavorites();
  }

  render() {
   
    const BookWithId = ({match}) => {
      return(
        this.props.auth.isAuthenticated
        ?
        <BookDetail book={this.props.books.books.filter((book) => book._id === match.params.bookId )[0]}
          isLoading={this.props.books.isLoading}
          errMess={this.props.books.errMess}
          favorite={this.props.favorites.favorites===null ? false : this.props.favorites.favorites.books.some((book)=> book._id===match.params.bookId) }
          postFavorite={this.props.postFavorite}
          deleteFavorite={this.props.deleteFavorite}
          />
        :
        <BookDetail book={this.props.books.books.filter((book) => book._id === match.params.bookId)[0]}
          isLoading={this.props.books.isLoading}
          errMess={this.props.books.errMess}
          favorite={false}
          postFavorite={this.props.postFavorite}
          deleteFavorite={this.props.deleteFavorite}
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
              <Route exact path="/menu" component={() => <Menu books={this.props.books} />} />
              <Route path="/menu/:bookId" component={BookWithId} />
              <PrivateRoute exact path="/favorites" component={() => <Favorites favorites={this.props.favorites} deleteFavorite={this.props.deleteFavorite} />} />
              <PrivateRoute exact path="/addbook" component={() => <AddBook resetBookForm={this.props.resetBookForm}  postBook={this.props.postBook} />} />

            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
