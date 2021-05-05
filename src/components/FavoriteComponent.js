import React, { Component } from 'react';
import { Media, Breadcrumb, BreadcrumbItem, Button,Card, CardText, CardBody,
    CardTitle } from 'reactstrap';
    import { FadeTransform } from 'react-animation-components';

import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

function RenderMenuItem({ book, deleteFavorite }) {
    return(
        <div className="col-12  m-1">
        <FadeTransform in 
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
            <Card>
                <CardBody>
                <Button outline color="danger" onClick={() => deleteFavorite(book._id)}>
                <span className="fa fa-times"></span>
                </Button>
                    <CardTitle>{book.title}</CardTitle>

                </CardBody>
            </Card>
        </FadeTransform>
    </div>
    );
}

const Favorites = (props) => {

    if (props.favorites.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.favorites.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.favorites.errMess}</h4>
                </div>
            </div>
        )
    }
    else if (props.favorites.favorites.books.length!=0) {
        const favorites = props.favorites.favorites.books.map((book) => {
            return (
                <div key={book._id} className="col-12 mt-5">
                    <RenderMenuItem book={book} deleteFavorite={props.deleteFavorite} />
                </div>
            );
        });
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Books</Link></BreadcrumbItem>
                        <BreadcrumbItem active>My Favorites</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>My Favorites</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <Media list>
                        {favorites}
                    </Media>
                </div>
            </div>
        );
    }
    else {
        return(
            <div className="container">
                <div className="row">
                    <h4>You have no favorites</h4>
                </div>
            </div>
        )
    }
}

export default Favorites;