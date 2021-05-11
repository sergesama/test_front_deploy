import React, { Component } from 'react';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';



class AssessmentStart extends Component {
    constructor(props) {
        super(props);
        this.state={
            competence_profile: "",
            evaluated: "",
            evaluators:[]
        }
        //this.AddCompetence = this.AddCompetence.bind(this);
    }

    handleSubmit = (values) => {
        console.log("Submit Values "+ values)
        /*
        this.props.postCompetenceProfile(values);
        this.props.resetCompetenceProfileForm();
        this.setState({
            AddedCompetenceList: []
        });
        */
        
    }
    render(){
    
        return(
            <div/>
        )    
    }
}

export default AssessmentStart;
