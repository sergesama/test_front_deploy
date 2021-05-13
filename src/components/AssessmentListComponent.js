import React from 'react';
import {  CardTitle, ListGroupItem ,ListGroup} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

    function RenderItem({ assessments }) {
        return(
            <ListGroupItem >
                <Link to={`/assessments/${assessments._id}`} >
                        <CardTitle>{"Название оценки: " + assessments.name}</CardTitle>
                        <CardTitle>{"Оцениваемый: " +assessments.evaluated.firstname + " " + assessments.evaluated.lastname +" (" + assessments.evaluated.username + ") "}</CardTitle>
                </Link>
            </ListGroupItem>
        );
    }
    class AssessmentList extends React.Component {


        render() {
        if (this.props.assessments.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.assessments.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{this.props.assessments.errMess}</h4>
                    </div>
                </div>
            );
        }
        else
        {
            this.props.assessments.assessments=this.props.assessments.assessments.filter((profiles) => profiles.evaluators.indexOf(localStorage.getItem('userId'))!==-1)
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12 ">
                            <h3>Оценки</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                    <ListGroup>
                    {this.props.assessments.assessments.map((assessments) => {
            
                        return (
                                <RenderItem assessments={assessments} />
                        );
                    })}
                        </ListGroup>
                    </div>
                </div>
            );
        }
        }
    }

export default AssessmentList;