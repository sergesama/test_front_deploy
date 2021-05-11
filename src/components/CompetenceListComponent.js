import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Control } from 'react-redux-form';

function CompetenceRaw ({competence,switchFunction,type,raw_number,count,changeForm}){
    if(type==="plus")
        return(
            <ListGroupItem className="col-12">
                <div className="h5 d-inline-block col-10">{competence.name}</div>
                <div className="fa fa-plus text-primary fa-lg col-2 text-right" onClick={()=>{switchFunction(competence,raw_number,count)}} ></div>
            </ListGroupItem>
        );
    else
    {
        
        return(
            <ListGroupItem className="col-12">
                <div className="h5 d-inline-block col-8">{competence.name}</div>
                <div className="fa fa-minus text-primary fa-lg col-2 text-right" onClick={()=>{switchFunction(competence)}} ></div>
                <Control.text className="col-2 d-none" model={`.competences[${raw_number}].competence_id`} defaultValue={`${competence._id}`} name="weight"  placeholder="Вес" />
                <Control.text className="col-2" model={`.competences[${raw_number}].weight`} value={`${100/count}`} name="weight"  placeholder="Вес (1-100)" />
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
        const competences_list=this.props.competences.map((competence,index,array)=>{
            return(
                <CompetenceRaw competence={competence} switchFunction={this.props.switchFunction} type={this.props.type} raw_number={index} count={array.length} changeForm={this.props.changeForm} />
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