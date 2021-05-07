import React, { Component } from 'react';
import CompetenceList from './CompetenceListComponent';
import { Button } from 'reactstrap';
import { Form } from 'react-redux-form';
class Create_Competence_Profile extends Component {

    constructor(props) {
        super(props);
        this.state={
            AddedCompetenceList: []
        }
        this.AddCompetence = this.AddCompetence.bind(this);
        this.RemCompetence = this.RemCompetence.bind(this);
    }
    AddCompetence = (competence) =>{
        var flag=true;
        this.state.AddedCompetenceList.forEach(comp=>{if(comp.name.indexOf(competence.name)!=-1)flag = false;});
        if (flag) this.setState({AddedCompetenceList:this.state.AddedCompetenceList.concat(competence)})
    }

    RemCompetence = (competence) =>{
        this.setState({AddedCompetenceList:this.state.AddedCompetenceList.filter(comp => comp.name!==competence.name)})
    }
    handleSubmit = (values) => {
        console.log("Current State is: " + JSON.stringify(values));
        this.props.postCompetenceProfile(values);
        this.setState({
            AddedCompetenceList: []
        });
    }
    render() {
        
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3>Создание компетенции</h3>
                        <hr />
                    </div>
                </div>
                    <div className="row row-content">
                        <Form className="col-12" model="myForms.competence_profile" onSubmit={(values) => this.handleSubmit(values)}>
                            <CompetenceList  competences={this.state.AddedCompetenceList} switchFunction={this.RemCompetence} type="minus"  />
                            <Button type="submit" color="primary">
                                Создать Профиль
                            </Button>
                        </Form>
                    </div>
                <div className="row">
                    <div className="col-12">
                        <h3>Список компетенции</h3>
                        <hr />
                    </div>
                </div>
                <div className="row row-content">
                    <CompetenceList  competences={this.props.competences.competences} switchFunction={this.AddCompetence} type="plus"  />
                </div>
            </div>
        );
    }

}

export default Create_Competence_Profile;