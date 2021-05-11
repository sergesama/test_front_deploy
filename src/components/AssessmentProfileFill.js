import React, { Component } from 'react';
import { Button,ListGroup, ListGroupItem } from 'reactstrap';
import { Form,Control,Field } from 'react-redux-form';
import { Loading } from './LoadingComponent';

function CompetenceRaw ({competence,index}){
    const options =competence.competence_id.indicators.sort((a,b) => b.procent-a.procent).map((indicator)=>{
        return(
            <div className="row">
                <div className="col-5 h5">
                    {indicator.name + " "}
                </div>
                <div className="col-1">
                {indicator.procent}
                    <Control.radio  component="input" model={`myForms.filledAssessmentProfiled.competences[${index}].chosenValue`} value={`${indicator.procent}`} />
                    <Control.text className="d-none"  component="input" model={`myForms.filledAssessmentProfiled.competences[${index}].comp_id`} defaultValue={`${competence.competence_id._id}`}   />
                    <Control.text className="d-none"  component="input" model={`myForms.filledAssessmentProfiled.competences[${index}].weight`} defaultValue={`${competence.weight}`}   />
                </div>
                <div className="col-6">
                    {" " + indicator.description}</div>
                </div>
        );
    })
        return(
            <ListGroupItem className="col-12">
                <div className="h5 d-inline-block col-10">{competence.competence_id.name}</div>
                {options}
                
                
            </ListGroupItem>
        );
}
class Assisment_Fill extends Component {
    constructor(props) {
        super(props);
        


        
    }

    handleSubmit = (values) => {
        console.log("Submit Values "+ JSON.stringify(values));
        this.props.postFillAssessmentProfile(values);
        this.props.resetfilledAssessmentProfileForm();
        
        
        
    }

    render() {

   

        /*
        const competences_list=this.props.competences.map((competence,index)=>{
            return(
                <CompetenceRaw competence={competence} switchFunction={this.props.switchFunction} type={this.props.type} raw_number={index} />
            );
        });
        */
       console.log(this.props.assessment_profile)
       if (this.props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (this.props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{this.props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (this.props.assessment_profile != null)  
    {  
        console.log(this.props.assessment_profile)
        const assessment_name=this.props.assessment_profile.assessment.name
        const answeringList = this.props.assessment_profile.competence_profile.competences.map((competence,index) =>{
            return(
                <CompetenceRaw competence={competence} index= {index} />
            );
        })
            return(
                <div className="container p-0">
                    <div className="row">
                        <div className="col-12">
                            <h3>Оценка: {assessment_name}</h3>
                            
                        </div>
                    </div>
                    <div className="row">
                    <Form className="col-12" model="myForms.filledAssessmentProfiled" onSubmit={(values) => this.handleSubmit(values)}>
                    <Control.text className="d-none"  component="input" model={`myForms.filledAssessmentProfiled.assessmentProfileId`} defaultValue={`${this.props.assessment_profile._id}`}   />
                    <Control.text className="d-none"  component="input" model={`myForms.filledAssessmentProfiled.assessmentId`} defaultValue={`${this.props.assessment_profile.assessment._id}`}   />
                        <ListGroup className="col-12">
                            {answeringList}
                        </ListGroup>
                        <div className="row mb-1">
                            <Button color="primary" className="mt-2 col-3" onClick={this.toggleEvaluatorsModal} >
                                Оценить
                            </Button>
                        </div>
                    </Form>
                    </div>
                </div>
            );
       }
    }

}

export default Assisment_Fill;