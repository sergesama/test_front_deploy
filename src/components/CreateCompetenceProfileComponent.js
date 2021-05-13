import React, { Component } from 'react';
import CompetenceList from './CompetenceListComponent';
import { Button } from 'reactstrap';
import { Form,Control } from 'react-redux-form';
class Create_Competence_Profile extends Component {

    constructor(props) {
        super(props);
        this.state={
            AddedCompetenceList: [],
            competences: [...this.props.competences.competences]
        }
        this.AddCompetence = this.AddCompetence.bind(this);
        this.RemCompetence = this.RemCompetence.bind(this);
    }
    AddCompetence = (competence,raw_number,count) =>{
        this.props.changeForm("myForms.competence_profile.competences["+raw_number+"].weight",100/count)
        var flag=true;
        this.state.AddedCompetenceList.forEach(comp=>{if(comp.name.indexOf(competence.name)!==-1)flag = false;});
        if (flag) this.setState({AddedCompetenceList:this.state.AddedCompetenceList.concat(competence)})
    }

    RemCompetence = (competence) =>{
        this.setState({AddedCompetenceList:this.state.AddedCompetenceList.filter(comp => comp.name!==competence.name)})
    }
    handleSubmit = (values) => {
        this.props.postCompetenceProfile(values);
        this.props.resetCompetenceProfileForm();
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
                            <Control.text className="col-5 mb-2" model=".name" name="name"  placeholder="Название профиля" />
                            <CompetenceList  competences={this.state.AddedCompetenceList}  switchFunction={this.RemCompetence} changeForm={this.props.changeForm} type="minus"  />
                            <Button type="submit" color="primary" className="mt-2" >
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
                    <CompetenceList  competences={this.state.competences}  switchFunction={this.AddCompetence} type="plus"  />
                </div>
            </div>
        );
    }

}

export default Create_Competence_Profile;