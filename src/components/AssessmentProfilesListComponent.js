import React from 'react';
import {  CardTitle,ListGroupItem ,ListGroup} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

    function RenderItem({ assessment_profiles }) {
        return(
            <ListGroupItem>
                <Link to={`/assessment_profile/${assessment_profiles._id}`} >
                        <CardTitle>{"Название оценки: " + assessment_profiles.assessment.name}</CardTitle>
                        
                </Link>
                <CardTitle className="text-success">{"Оцениваемый: " +assessment_profiles.evaluated.firstname + " " + assessment_profiles.evaluated.lastname }</CardTitle>
            </ListGroupItem>
        );
    }
    class Assessment_profiles extends React.Component {


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
            console.log(this.props.assessment_profiles.assessment_profiles)
            this.props.assessment_profiles.assessment_profiles=this.props.assessment_profiles.assessment_profiles.filter((profiles) => profiles.evaluator._id===localStorage.getItem('userId'))
            if(this.props.assessment_profiles.assessment_profiles.length!==0)
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
                                <RenderItem assessment_profiles={assessment_profiles} />
                        );
                    })}
                        </ListGroup>
                    </div>
                </div>
            );
            else{
                return (<div className="container"><div className="row mt-3"><h3>У вас нет доступных анкет оценки</h3></div></div>)
            }
        }
        
        }
    }

export default Assessment_profiles;