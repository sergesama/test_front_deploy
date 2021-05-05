import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, Form, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
function RenderRawItem({ name }) {
 
        return(
            <Row className="form-group">
                <Label htmlFor={name} md={2}>{name[0].toUpperCase() + name.substring(1)}</Label>
                <Col md={10}>
                    <Control.text model={`.${name}`} id={name} name={name}
                        placeholder={name[0].toUpperCase() + name.substring(1)}
                        className="form-control"
                        validators={{
                            minLength: minLength(3)
                        }}
                        />
                    <Errors
                        className="text-danger"
                        model={`.${name}`}
                        show="touched"
                        messages={{
                            minLength: 'Must be greater than 3 characters',
                        }}
                    />
                </Col>
            </Row>
         );
    
}
class AddBook extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (values) => {
        console.log("Current State is: " + JSON.stringify(values));
        this.props.postBook(values);
        this.props.resetBookForm();
    }

    render() {
        const rawMass=["publisher","contributor","date","type","identifier","source","language","darelationte","coverage","rights","audience","provenance","rightsholder"];
        const rows=rawMass.map((name) => {
                
            return (
                    <RenderRawItem name={name} />
            );
        })
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Books</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Add Book</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Create Book</h3>
                        <hr />
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12 col-md-9">
                        <Form model="book" onSubmit={(values) => this.handleSubmit(values)}>

                            <Row className="form-group">
                                <Label htmlFor="title" md={2}>Title</Label>
                                <Col md={10}>
                                    <Control.text model=".title" id="title" name="title"
                                        placeholder="Title"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".title"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 3 characters'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="subject" md={2}>Subject</Label>
                                <Col md={10}>
                                    <Control.text model=".subject" id="subject" name="subject"
                                        placeholder="Subject"
                                        className="form-control"
                                        validators={{
                                            minLength: minLength(3)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".subject"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 3 characters',
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="creator" md={2}>Creator</Label>
                                <Col md={10}>
                                    <Control.text model=".creator" id="creator" name="creator"
                                        placeholder="Creator"
                                        className="form-control"
                                        validators={{
                                            minLength: minLength(2)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".Creator"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters'
                                        }}
                                     />
                                </Col>
                            </Row>

                            

                            <Row className="form-group">
                                <Label htmlFor="description" md={2}>Description</Label>
                                <Col md={10}>
                                    <Control.textarea model=".description" id="description" name="description"
                                        rows="12"
                                        className="form-control" />
                                </Col>
                            </Row>

                            {rows}

                            <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                    Create Book
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }

}

export default AddBook;