import React, { Component } from 'react';
import { Button, Label, Col, Row } from 'reactstrap';
import { Control, Form, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
function RenderRawItem({raw_number}) {
        
        return(
            <Row className="form-group">
                <Col md={1}>{raw_number}</Col>
                <Col md={4}>
                    <Control.text model={`.indicators[${raw_number}].name`} id={`.indicator_name${raw_number}`} name={`.indicator_name${raw_number}`}
                        placeholder="Название"
                        className="form-control"
                        validators={{
                            required
                        }}
                            />
                    <Errors
                        className="text-danger"
                        model={`.indicators[${raw_number}].name`}
                        show="touched"
                        messages={{
                            required: 'Required'
                        }}
                        />
                </Col>
                <Col md={2}>
                    <Control.text model={`.indicators[${raw_number}].procent`} id={`.indicator_procent${raw_number}`} name={`.indicator_procent${raw_number}`}
                        placeholder="Процент"
                        className="form-control"
                        validators={{
                            required
                        }}
                            />
                    <Errors
                        className="text-danger"
                        model={`.indicators[${raw_number}].procent`}
                        show="touched"
                        messages={{
                            required: 'Required'
                        }}
                        />
                </Col>
                <Col md={5}>
                     <Control.textarea model={`.indicators[${raw_number}].description`} id={`.indicator_description${raw_number}`} name={`.indicator_description${raw_number}`}
                                        rows="1"
                                        className="form-control" />
                </Col>
            </Row>
         );
    
}
class Create_Competence extends Component {

    constructor(props) {
        super(props);
        this.state={
            raw_number:0,
            inputList: []
        }
        
    }

    handleSubmit = (values) => {
        console.log("Current State is: " + JSON.stringify(values));
        this.props.postCompetence(values);
        this.props.resetCompetenceForm();
        this.setState({
            raw_number:0,
            inputList: []
        });
    }
    handleClick = () => {
        this.setState({
            raw_number:this.state.raw_number+1,
            inputList: this.state.inputList.concat(<RenderRawItem raw_number={this.state.raw_number}/> )
        });
        console.log(this.state.raw_number)
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
                    <div className="col-12 col-md-9">
                    <Form model="myForms.competence" onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                    <Label htmlFor="competence_name" md={2}>Название</Label>
                    <Col md={4}>
                        <Control.text model=".name" id="competence_name" name="competence_name"
                            placeholder="Название"
                            className="form-control"
                            validators={{
                                required
                            }}
                                />
                        <Errors
                            className="text-danger"
                            model=".name"
                            show="touched"
                            messages={{
                                required: 'Required'
                            }}
                            />
                    </Col>
                    <Col md={{size:3}}>
                        <Button type="submit" color="primary">
                        Создать компетенцию
                        </Button>
                    </Col>
                    <Col md={{size:3}}>
                        <Button color="primary" onClick={()=> this.handleClick()}>
                        Добавить поле
                        </Button>
                    </Col>
                </Row>

                
                    {this.state.inputList.map(function(input, index) {
                    return input   
                     })}
                </Form>
                       
                    </div>
                </div>
            </div>
        );
    }

}

export default Create_Competence;