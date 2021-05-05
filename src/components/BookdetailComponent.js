import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Label,
    Modal, ModalHeader, ModalBody, Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

    function Renderbook({book, favorite, postFavorite, deleteFavorite}) {
        console.log(favorite)
            return(
                <div className="col-12  m-1">
                    <FadeTransform in 
                        transformProps={{
                            exitTransform: 'scale(0.5) translateY(-50%)'
                        }}>
                        <Card>
                            <CardBody>
                                <Button outline color="primary" onClick={() => favorite ? deleteFavorite(book._id) : postFavorite(book._id)}>
                                    {favorite ?
                                        <span className="fa fa-heart"></span>
                                        : 
                                        <span className="fa fa-heart-o"></span>
                                    }
                                </Button>
                                <CardTitle>{book.title}</CardTitle>
                                {book.creator!='' ? <CardText>{book.creator}</CardText>:''}
                                {book.subject!='' ? <CardText>{book.subject}</CardText>:''}
                                {book.description!='' ? <CardText>{book.description}</CardText>:''}
                                {book.publisher!='' ? <CardText>{book.publisher}</CardText>:''}
                                {book.contributor!='' ? <CardText>{book.contributor}</CardText>:''}
                                {book.date!='' ? <CardText>{book.date}</CardText>:''}
                                {book.type!='' ? <CardText>{book.type}</CardText>:''}
                                {book.identifier!='' ? <CardText>{book.identifier}</CardText>:''}
                                {book.language!='' ? <CardText>{book.language}</CardText>:''}
                                {book.darelationte!='' ? <CardText>{book.darelationte}</CardText>:''}
                                {book.coverage!='' ? <CardText>{book.coverage}</CardText>:''}
                                {book.rights!='' ? <CardText>{book.rights}</CardText>:''}
                                {book.audience!='' ? <CardText>{book.audience}</CardText>:''}
                                {book.provenance!='' ? <CardText>{book.provenance}</CardText>:''}
                                {book.rightsholder!='' ? <CardText>{book.rightsholder}</CardText>:''}

                            </CardBody>
                        </Card>
                    </FadeTransform>
                </div>
            );

    }

    const bookDetail = (props) => {
        console.log(props.favorite)
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.book != null)        
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Books</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Book</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.book.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <Renderbook book={props.book} favorite={props.favorite} postFavorite={props.postFavorite} deleteFavorite={props.deleteFavorite} />
                    </div>
                </div>
            );
        else
            return(
                <div></div>
            );
    }

export default bookDetail;