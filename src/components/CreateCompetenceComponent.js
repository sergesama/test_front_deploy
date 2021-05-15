import React, { Component } from 'react';
import { Button,  Col, Row } from 'reactstrap';
import { Control, Form, Errors } from 'react-redux-form';
const required = (val) => val && val.length;
const isNumber = (val) => !isNaN(Number(val));
function RenderRawItem({raw_number}) {
        
        return(
            <Row className="form-group">
                <Col className="text-center pt-2 pb-1" md={1}>{raw_number}</Col>
                <Col md={5}>
                    <Control.text model={`.indicators[${raw_number}].name`} id={`.indicator_name${raw_number}`} name={`.indicator_name${raw_number}`}
                        placeholder="Название поля"
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
                            required: 'Название поля не введено'
                        }}
                        />
                </Col>
                <Col md={2}>
                    <Control.text model={`.indicators[${raw_number}].procent`} id={`.indicator_procent${raw_number}`} name={`.indicator_procent${raw_number}`}
                        placeholder="Оценка"
                        className="form-control"
                        validators={{
                            required,
                            isNumber
                        }}
                            />
                    <Errors
                        className="text-danger"
                        model={`.indicators[${raw_number}].procent`}
                        show="touched"
                        messages={{
                            required: 'Обязательное поле',
                            isNumber: 'Должно быть числом'
                        }}
                        />
                </Col>
                <Col md={4}>
                     <Control.textarea model={`.indicators[${raw_number}].description`} id={`.indicator_description${raw_number}`} name={`.indicator_description${raw_number}`}
                                        rows="1"
                                        placeholder="Описание"
                                        className="form-control" />
                </Col>
            </Row>
         );
    
}
class Create_Competence extends Component {

    constructor(props) {
        super(props);
        this.state={
            raw_number:2,
            inputList: [].concat(<RenderRawItem raw_number={0}/> ).concat(<RenderRawItem raw_number={1}/>)
        }
        this.props.changeForm("myForms.competence.indicators[0].procent","0");
        this.props.changeForm("myForms.competence.indicators[1].procent","1");
    }

    handleSubmit = (values) => {
        this.props.postCompetence(values);
        this.props.resetCompetenceForm();
        this.setState({
            raw_number:2,
            inputList: [].concat(<RenderRawItem raw_number={0}/> ).concat(<RenderRawItem raw_number={1}/>)
        });
        this.props.changeForm("myForms.competence.indicators[0].procent","0");
        this.props.changeForm("myForms.competence.indicators[1].procent","1");
    }
    handleClick = () => {
        this.props.changeForm("myForms.competence.indicators["+(this.state.raw_number)+"].procent",""+this.state.raw_number);
        this.setState({
            raw_number:this.state.raw_number+1,
            inputList: this.state.inputList.concat(<RenderRawItem raw_number={this.state.raw_number}/> )
        });
    }
    render() {
        return(
            <div className="w-75 container m-auto">
                <div className="row">
                    <div className="col-12">
                        <h3>Создание компетенции</h3>
                        <hr />
                    </div>
                </div>
                <div className="row ">
                    <div className="col-12 col-md-9">
                    <Form model="myForms.competence" onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group mb-4">
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
                                required: 'Название компетенции не введено'
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

                <Row className="form-group ">
                    <Col className="h5 text-center" md={1}>#</Col>
                    <Col className="h5 text-center" md={5}>Название поля</Col>
                    <Col className="h5 text-center" md={2}>Оценка</Col>
                    <Col className="h5 text-center" md={4}>Описание</Col>
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