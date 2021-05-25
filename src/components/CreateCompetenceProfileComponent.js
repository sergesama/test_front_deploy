import React, { Component } from 'react';
import CompetenceList from './CompetenceListComponent';
import { Button } from 'reactstrap';
import { Form,Control,Errors } from 'react-redux-form';
const required = (val) => val && val.length;
const competencesNotEmpty = (competencesArr) => competencesArr.length!==0;
var weight;
const weightDeaposoned = (competencesArr) => {
    weight=0;
    competencesArr.forEach((comp)=>{
        console.log(parseInt(comp.weight))
        weight+=parseInt(comp.weight)
    })
    
    return (weight<=100)
}
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
    AddCompetence = (competence,raw_number) =>{
        var flag=true;
        this.state.AddedCompetenceList.forEach((comp)=>{
            if(comp.name.indexOf(competence.name)!==-1)flag = false;
        });
        console.log("flag")
        console.log(flag)
        console.log(raw_number)
        if (flag) {
            this.setState({AddedCompetenceList:this.state.AddedCompetenceList.concat(competence)})
            console.log(this.state.AddedCompetenceList.length)
            this.props.changeForm("myForms.competence_profile.competences["+this.state.AddedCompetenceList.length+"].competence_id",competence._id)
            this.props.changeForm("myForms.competence_profile.competences["+this.state.AddedCompetenceList.length+"].weight",(100/(this.state.AddedCompetenceList.length+1)).toFixed())
            this.state.AddedCompetenceList.forEach((comp,index)=>{
                this.props.changeForm("myForms.competence_profile.competences["+index+"].competence_id",comp._id)
                this.props.changeForm("myForms.competence_profile.competences["+index+"].weight",(100/(this.state.AddedCompetenceList.length+1)).toFixed())
            });
            
        }
    }

    RemCompetence = (competence) =>{
        this.setState({AddedCompetenceList:this.state.AddedCompetenceList.filter(comp => comp.name!==competence.name)})
        this.state.AddedCompetenceList.forEach((comp,index)=>{
            this.props.changeForm("myForms.competence_profile.competences["+index+"].competence_id",comp._id)
            this.props.changeForm("myForms.competence_profile.competences["+index+"].weight",(100/(this.state.AddedCompetenceList.length-1)).toFixed())
        });
        this.props.removeForm("myForms.competence_profile.competences",this.state.AddedCompetenceList.length-1)
    }
    handleSubmit = (values) => {
        this.props.postCompetenceProfile(values);
        this.props.resetCompetenceProfileForm();
        this.setState({
            AddedCompetenceList: []
        });
        
    }
    handleFailedSubmit(form){
        var alertString=""
        if(!form.competences.$form.validity.competencesNotEmpty) alertString+="Компетенции не выбраны.\n"
        if(!form.competences.$form.validity.weightDeaposoned) alertString+="Сумма весов компетенций больше ста.\n"
        if(alertString!="") alert("Ошибка Формы.\n"+alertString)
    }
    render() {
        
        if(this.state.AddedCompetenceList.length!==0)
        var addedHeader=(
            <div className="row">
            <div className="col-10 h5">
                Название
            </div>
            <div className="col-2 text-center h5">
                Вес*
            </div>
        </div>)
        else
        var addedHeader=<div/>
        const form=(
            <Form className="col-12" model="myForms.competence_profile" validateOn="submit" onSubmitFailed={(userForm) => this.handleFailedSubmit(userForm)} validators={{competences: { competencesNotEmpty,weightDeaposoned }}} onSubmit={(values) => this.handleSubmit(values)}>
                <Control.text className="col-5 mb-2" validators={{required}} model=".name" name="name"  placeholder="Название профиля" />
                <Errors
                    className="text-danger col-6"
                    model=".name"
                    show="touched"
                    messages={{
                        required: 'Название профиля не введено'
                    }}
                />
                {addedHeader}
                <CompetenceList  competences={this.state.AddedCompetenceList}  switchFunction={this.RemCompetence} changeForm={this.props.changeForm} type="minus"  />
                <Button type="submit" color="primary" className="mt-2" >
                    Создать Профиль
                </Button>
            </Form>
        )
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3>Создание компетенции</h3>
                        <hr />
                    </div>
                </div>
                    <div className="row row-content">
                        {form}
                    </div>
                <div className="row">
                    <div className="col-12">
                        <h3>Список компетенции</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">

                </div>
                <div className="row row-content">
                    <CompetenceList  competences={this.state.competences}  switchFunction={this.AddCompetence} type="plus"  />
                </div>
            </div>
        );
    }

}

export default Create_Competence_Profile;