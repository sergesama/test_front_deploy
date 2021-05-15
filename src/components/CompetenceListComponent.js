import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Control,Errors } from 'react-redux-form';
const required = (val) => val && val.length;
const weightPositive = (val) => val>0;
const isNumber = (val) => !isNaN(Number(val));
function CompetenceRaw ({competence,switchFunction,type,raw_number}){
    if(type==="plus")
        return(
            <ListGroupItem className="col-12">
                <div className="h5 d-inline-block col-10">{competence.name}</div>
                <div className="fa fa-plus text-primary fa-lg col-2 text-right" onClick={()=>{switchFunction(competence,raw_number)}} ></div>
            </ListGroupItem>
        );
    else
    {
        
        return(
            <ListGroupItem className="col-12">
                <div className="h5 d-inline-block col-10">{competence.name}</div>
                <Control.text className="d-none" model={`.competences[${raw_number}].competence_id`}  name="id"  placeholder="Название" />
                <div className="fa fa-minus text-primary fa-lg col-1 text-right" onClick={()=>{switchFunction(competence)}} />
                <Control.text className="col-1" model={`.competences[${raw_number}].weight`} validators={{required,weightPositive,isNumber}} name="weight"  placeholder="Вес" />
                <Errors
                        className="text-danger col-12 text-right"
                        model={`.competences[${raw_number}].weight`}
                        show="touched"
                        messages={{
                            required: 'Обязательное поле.\n',
                            weightPositive: 'Вес должен быть больше нуля.\n',
                            isNumber: "Вес должен быть числом."
                        }}
                />
            </ListGroupItem>
        ); 
    }
}
class Competence_List extends Component {
    constructor(props) {
        super(props);
        this.state={
            competence_count:this.props.competences.length
        }
    }
    render() {
        const competences_list=this.props.competences.map((competence,index)=>{
            return(
                <CompetenceRaw competence={competence} switchFunction={this.props.switchFunction} type={this.props.type} raw_number={index}  />
            );
        });
        return(
            <div className="container p-0">
                <div className="row">
                <ListGroup className="col-12">
                  {competences_list}
                </ListGroup>
                </div>
            </div>
        );
    }

}

export default Competence_List;