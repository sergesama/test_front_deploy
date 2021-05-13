import React, { Component } from 'react';
import { Form, Control } from 'react-redux-form';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';


class AssessmentStart extends Component {
    constructor(props) {
        super(props);
        this.state={
            profiledClicked:"",
            evaluatedClicked:[],
            evaluatorsClicked:[],
            isProfilesModalOpen: false,
            isEvaluatedModalOpen: false,
            isEvaluatorsModalOpen: false,
            competence_profile: "",
            evaluated: "",
            evaluators:[]
        }
        this.toggleProfilesModal = this.toggleProfilesModal.bind(this);
        this.toggleEvaluatedModal = this.toggleEvaluatedModal.bind(this);
        this.toggleEvaluatorsModal = this.toggleEvaluatorsModal.bind(this);
    }



    toggleProfilesModal() {
        this.setState({
            isProfilesModalOpen: !this.state.isProfilesModalOpen
        });
    }

    toggleEvaluatedModal() {
        this.setState({
            isEvaluatedModalOpen: !this.state.isEvaluatedModalOpen
        });
    }

    toggleEvaluatorsModal() {
        this.setState({
            isEvaluatorsModalOpen: !this.state.isEvaluatorsModalOpen
        });
    }
    
    handleProfiledClassChanged(profile) {
        this.props.changeAssessmentForm('myForms.assessment.competence_profile',profile._id);
        if(this.state.profiledClicked!==profile.name)
            this.setState({
                profiledClicked: profile.name
            });
        else
            this.setState({
                profiledClicked: ""
            });
    }

    handleEvaluatedClassChanged(user) {
        let evaluatedArr =[]
        this.props.changeAssessmentForm('myForms.assessment.evaluated',user._id);
        if(this.state.evaluatedClicked.find((elem)=>{return elem.username===user.username}) ===undefined)
        {
            evaluatedArr.push(user)
            this.setState({
                evaluatedClicked: evaluatedArr
            });
        }
        else
        {
            this.setState({
                evaluatedClicked: []
            });
        }
    }

    handleEvaluatorsClassChanged(user) {
        let evaluatorsArr =[...this.state.evaluatorsClicked]
        if(this.state.evaluatorsClicked.find((elem)=>{return elem===user._id}) ===undefined)
        {
            evaluatorsArr.push(user._id)
            this.setState({
                evaluatorsClicked: evaluatorsArr
            });
        }
        else
        {
            evaluatorsArr=evaluatorsArr.filter(el => el!==user._id)
            this.setState({
                evaluatorsClicked: evaluatorsArr
            });
        }
        this.props.changeAssessmentForm('myForms.assessment.evaluators',evaluatorsArr);
    }

    handleSubmit = (values) => {
        console.log("Submit Values "+ JSON.stringify(values))
        
        this.props.postAssessment(values);
        this.props.resetAssessmentForm();
        this.setState({
            profiledClicked:"",
            evaluatedClicked:[],
            evaluatorsClicked:[]
        });
        
        
    }
    render(){
        var profiles;
        var evaluated;
        var evaluators;
        if(this.props.competence_profiles!==undefined)
            profiles = this.props.competence_profiles.competence_profiles.map((profile) => {
                return(
                    <ListGroupItem className={`h5 col-12 ${this.state.profiledClicked === profile.name && "list-bg-grey"}`}  onClick={this.handleProfiledClassChanged.bind(this, profile)}>{profile.name}</ListGroupItem>
                );
            })
        else
            profiles = <div/>;
        
        if(this.props.users!==undefined)
            evaluated = this.props.users.users.map((user) => {
                return(
                    <ListGroupItem className={`h5 col-12 ${(this.state.evaluatedClicked.find((elem)=>{return elem.username===user.username}) !== undefined) && "list-bg-grey"}`}  onClick={this.handleEvaluatedClassChanged.bind(this, user)}>{user.firstname + " " + user.lastname + " ( " + user.username + " )"}</ListGroupItem>
                );
            })
        else
            evaluated = <div/>;
        
        if(this.props.users!==undefined)
            evaluators = this.props.users.users.map((user) => {
                return(
                    <ListGroupItem className={`h5 col-12 ${ (this.state.evaluatorsClicked.find((elem)=>{return elem===user._id}) !== undefined) && "list-bg-grey"}`}  onClick={this.handleEvaluatorsClassChanged.bind(this, user)}>{user.firstname + " " + user.lastname + " ( " + user.username + " )"}</ListGroupItem>
                );
            })
        else
            evaluators = <div/>;

        return(
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3>Запуск Оценки</h3>
                        <hr />
                    </div>
                </div>
                <div className="row row-content">
                    <Form className="col-12" model="myForms.assessment" onSubmit={(values) => this.handleSubmit(values)}>
                        <div className="row">
                            <Control.text className="col-6 mb-2 form-control" model=".name" name="name"  placeholder="Название оценки" />
                        </div>

                        <div className="row mb-1">
                            <Button color="primary" className="mt-2 col-3" onClick={this.toggleEvaluatedModal} >
                                Добавить оцениваемого
                            </Button>
                        </div>

                        <ListGroup className="col-6 ">
                            
                                {
                                (this.state.evaluatedClicked.map(user => {
                                    return(
                                    <ListGroupItem className="h5 col-12 py-3">
                                        {user.firstname + " " + user.lastname + " ( " + user.username + " )"}                            
                                    </ListGroupItem>
                                    )
                                })) 
                                }
                                
                        </ListGroup>

                        <div className="row mb-1">
                            <Button color="primary" className="mt-2 col-3" onClick={this.toggleProfilesModal} >
                                Добавить профиль компетенций
                            </Button>

                        </div>
                        <ListGroup className="col-6 ">
                               <ListGroupItem className="h5 col-12 py-3">{this.state.profiledClicked}</ListGroupItem>
                        </ListGroup>
                        <div className="row mb-1">
                            <Button color="primary" className="mt-2 col-3" onClick={this.toggleEvaluatorsModal} >
                                Добавить оценивающих
                            </Button>
                        </div>
                        <ListGroup className="col-6">
                            {
                            (this.state.evaluatorsClicked.map((user,index) => {
                                var userprops = this.props.users.users.find(el => {return el._id ===user})
                                return(
                                    <ListGroupItem className="h5 col-12">
                                        {userprops.firstname + " " + userprops.lastname + " ( " + userprops.username + " )"}
                                    </ListGroupItem>
                                )
                            })) 
                            }
                        </ListGroup>
                        <div className="row">
                            <Button type="submit" color="primary" className="mt-3 col-2" >
                                Запустить Оценку
                            </Button>
                        </div>
                    </Form>
                </div>

                <Modal isOpen={this.state.isProfilesModalOpen} >
                    <ModalHeader toggle={this.toggleProfilesModal}>Выбирете профиль</ModalHeader>
                    <ModalBody>
                    <ListGroup className="col-12">
                        {profiles}
                    </ListGroup>
                    <Button color="primary" className="mt-2" onClick={()=>this.toggleProfilesModal()} >
                        Добавить профиль
                    </Button>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isEvaluatedModalOpen} >
                    <ModalHeader toggle={this.toggleEvaluatedModal}>Выбирете оцениваемого</ModalHeader>
                    <ModalBody>
                    <ListGroup className="col-12">
                        {evaluated}
                    </ListGroup>
                    <Button color="primary" className="mt-2" onClick={()=>this.toggleEvaluatedModal()} >
                        Добавить оцениваемого
                    </Button>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isEvaluatorsModalOpen} >
                    <ModalHeader toggle={this.toggleEvaluatorsModal}>Выбирете оценивающих</ModalHeader>
                    <ModalBody>
                    <ListGroup className="col-12">
                        {evaluators}
                    </ListGroup>
                    <Button color="primary" className="mt-2" onClick={()=>this.toggleEvaluatorsModal()} >
                        Добавить оценивающих
                    </Button>
                    </ModalBody>
                </Modal>
        </div>
        )
    }
}

export default AssessmentStart;