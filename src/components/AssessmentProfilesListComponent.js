import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem,ListGroupItem ,ListGroup,InputGroup,Button,Input,Label,Form} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

    function RenderMenuItem({ assessment_profiles }) {
        return(
            <ListGroupItem>
                <Link to={`/assessment_profile/${assessment_profiles._id}`} >
                        <CardTitle>{"Название оценки: " + assessment_profiles.assessment.name}</CardTitle>
                        <CardTitle>{"Оцениваемый: " +assessment_profiles.evaluated.firstname + " " + assessment_profiles.evaluated.lastname +" (" + assessment_profiles.evaluated.username + ") "}</CardTitle>
                </Link>
            </ListGroupItem>
        );
    }
    class Menu extends React.Component {
        constructor(props) {
            super(props);
            
          }
        

        render() {
        if (this.props.assessment_profiles.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.assessment_profiles.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{this.props.assessment_profiles.errMess}</h4>
                    </div>
                </div>
            );
        }
        else
        {
            console.log(localStorage.getItem('userId'))
            this.props.assessment_profiles.assessment_profiles=this.props.assessment_profiles.assessment_profiles.filter((profiles) => profiles.evaluator._id===localStorage.getItem('userId'))
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12 ">
                            <h3>Анкеты</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                    <ListGroup>
                    {this.props.assessment_profiles.assessment_profiles.map((assessment_profiles) => {
            
                        return (
                                <RenderMenuItem assessment_profiles={assessment_profiles} />
                        );
                    })}
                        </ListGroup>
                    </div>
                </div>
            );
        }
        }
    }

export default Menu;