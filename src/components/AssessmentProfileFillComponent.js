import React, { Component } from 'react';
import { Button,ListGroup, ListGroupItem } from 'reactstrap';
import { Form,Control, Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent';
import {  Redirect  } from 'react-router-dom';
var filled;
const profileFilled = (val) => {
    filled=true;
    val.competences.forEach((competence)=>{
        if(competence.chosenValue===undefined)
        filled=false;
    })
    return filled;
}
function CompetenceRaw ({competence,index,setFormValue}){
    const options =competence.competence_id.indicators.sort((a,b) => b.procent-a.procent).map((indicator)=>{
        return(
            <div className="row">
                <div className="col-5 h5 border-right border-left mb-0">
                    {indicator.name + " "}
                </div>
                <div className="col-1 border-right border-left">
                        <label>
                            <input onClick={()=>setFormValue(indicator.procent,index)} className="custom-radio" type="radio" name="radio" />
                            <span className="custom-span">{indicator.procent}</span>
                        </label>
                        <Control.radio className="d-none" component="input"   model={`myForms.filledAssessmentProfiled.competences[${index}].chosenValue`} value={`${indicator.procent}`} />
                        <Control.text className="d-none"  component="input" model={`myForms.filledAssessmentProfiled.competences[${index}].comp_id`} defaultValue={`${competence.competence_id._id}`}   />
                        <Control.text className="d-none"  component="input"  model={`myForms.filledAssessmentProfiled.competences[${index}].weight`} defaultValue={`${competence.weight}`}   />
                        
                </div>
                    <div className="col-6 border-right border-left">
                    {" " + (indicator.description!==undefined)? indicator.description : ""}
                    </div>
            </div>
        );
    })
        return(
            <ListGroupItem className="col-12 border-right-0 border-top-0 border-left-0 border-bottom pb-0 px-3 mb-2">
                <div className="h5 d-inline-block col-10">{competence.competence_id.name}</div>
                <div className="row">
                    <div className="col-5 text-center border">
                        Название
                    </div>
                    <div className="col-1 text-center border">
                        Значение
                    </div>
                    <div className="col-6 text-center border">
                        Описание
                    </div>
                </div>
                <form>
                    {options}
                </form>
                
            </ListGroupItem>
        );
}
class Assisment_Fill extends Component {
    constructor(props) {
        super(props);
        this.state ={
            referrer:null
        }
        this.setFormValue = this.setFormValue.bind(this);
    }

    handleSubmit = (values) => {
        this.props.postFillAssessmentProfile(values);
        this.props.resetfilledAssessmentProfileForm();
        this.setState({referrer: '/assessments'});
        
        
    }
    setFormValue =(value,index) =>{
        this.props.changeForm(`myForms.filledAssessmentProfiled.competences[${index}].chosenValue`,value)
    }
    render() {
        if (this.state.referrer) return <Redirect to={this.state.referrer} />;
   

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
        const assessment_name=this.props.assessment_profile.assessment.name
        const answeringList = this.props.assessment_profile.competence_profile.competences.map((competence,index) =>{
            return(
                    <CompetenceRaw competence={competence} index= {index} setFormValue={this.setFormValue} />
            );
        })
            return(
                <div className="container p-0">
                    <div className="row">
                        <div className="col-12 m-3">
                            <h3>Оценка: {assessment_name}</h3>
                            
                        </div>
                    </div>
                    <div className="row">
                    <Form className="col-12" model="myForms.filledAssessmentProfiled" validators={{'':profileFilled}} onSubmit={(values) => this.handleSubmit(values)}>
                    <Control.text className="d-none"  component="input" model={`myForms.filledAssessmentProfiled.assessmentProfileId`} defaultValue={`${this.props.assessment_profile._id}`}   />
                    <Control.text className="d-none"  component="input" model={`myForms.filledAssessmentProfiled.assessmentId`} defaultValue={`${this.props.assessment_profile.assessment._id}`}   />
                        <ListGroup className="col-12">
                            {answeringList}
                        </ListGroup>
                        <div className="row mb-1">
                            <Button color="primary" className="mt-2 col-3" type="submit" >
                                Оценить
                            </Button>
                            <Errors
                                className="text-danger col-6"
                                model="myForms.filledAssessmentProfiled"
                                show="true"
                                messages={{
                                    profileFilled: 'Оценка не заполнена'
                                }}
                            />
                        </div>
                    </Form>
                    </div>
                </div>
            );
       }
    }

}

export default Assisment_Fill;