import React from 'react';
import { ListGroup,ListGroupItem} from 'reactstrap';
import { Loading } from './LoadingComponent';

    function RenderFilledProfile({profile}){
        return(
            <ListGroupItem >
                
                <div className="h5">{"Оценивающий: " +profile.assessmentProfileId.evaluator.firstname + " " + profile.assessmentProfileId.evaluator.lastname +" (" + profile.assessmentProfileId.evaluator.username + ") "}</div>
                <ListGroup>
                    {profile.competences.map((comp)=>{
                        return(
                            <ListGroupItem >
                                <div className="row text-secondary">
                                    {"Название компетенции: "+comp.comp_id.name}
                                </div>
                                <div className="row text-info ml-1">
                                    {"Выбранное значение: "+comp.comp_id.indicators[comp.chosenValue].name + " ("+comp.chosenValue+ ")"}
                                </div>
                            </ListGroupItem>
                        );
                    })}
                </ListGroup>
            </ListGroupItem>
        );
    }

    function RenderUnFilledProfile({profile}){
        return(
            <ListGroupItem >
                
                <div className="h5">{"Оценивающий: " +profile.evaluator.firstname + " " + profile.evaluator.lastname +" (" + profile.evaluator.username + ") "}</div>

            </ListGroupItem>
        );
    }

    class AssessmentResult extends React.Component {
        constructor(props) {
            super(props);
            
            var max_score=0;
            var result=0;
            if(this.props.filled_assessment_profiles.length!==0){
                this.props.filled_assessment_profiles[0].assessmentId.competence_profile.competences.forEach((competence)=>{
                    max_score+=(competence.competence_id.indicators.length-1)*(competence.weight/100)
                })
                this.props.filled_assessment_profiles.forEach((profile)=>{ 
                    profile.competences.forEach((comp)=>{
                        result += comp.chosenValue*(comp.weight/100)   
                    })
                })
            }
            this.state ={
                max_score:(max_score*(this.props.filled_assessment_profiles.length)).toFixed(2),
                result:((result===0) ? result : result.toFixed(2))
            }
        }

        render() {
            if (this.props.isLoading) {
                return(
                    <div className="container">
                        <div className="row">
                            <Loading />
                        </div>
                    </div>
                );
            }
            else if (this.props.errMess) {
                return(
                    <div className="container">
                        <div className="row">
                            <h4>{this.props.errMess}</h4>
                        </div>
                    </div>
                );
            }
            else
            {
                const main=(this.props.assessment_profiles.length===0) ? (
                <div >
                    <div className="row h5 text-success">
                        Статус оценки: Завершена
                    </div>
                    <div className="row h6">
                        Результат Оценки:
                    </div>
                    <div className="ml-3 text-info">
                        {this.props.filled_assessment_profiles.map((profile)=>{
                            var cur_score=0;
                            profile.competences.forEach((comp)=>{
                                cur_score += comp.chosenValue*(comp.weight/100)   
                            })
                            return(
                                <div className="row">
                                    <div >
                                        {
                                        "Оценивающий: "
                                         + profile.assessmentProfileId.evaluator.firstname + " " + profile.assessmentProfileId.evaluator.lastname +" (" + profile.assessmentProfileId.evaluator.username + ") поставил оценку "
                                         + ((cur_score===0) ? cur_score : cur_score.toFixed(2))
                                         }
                                         </div>
                                </div>
                            );
                        })}
                        <div className="row">
                            {"Итоговая оценка: "+this.state.result}
                        </div>
                        <div className="row">
                            {"Максимальная оценка: "+this.state.max_score}
                        </div>

                    </div>
                    <div className="row h6">
                            {"В результате оценки Сотрудник соответствует профилю компетенции на "+((this.state.result/this.state.max_score)*100).toFixed()+"%"}
                    </div>
                </div>
                )
                :
                (
                <div className="row col-12 h5 text-danger">
                    Статус оценки: В процессе
                    </div>
                );

                const filled=(this.props.filled_assessment_profiles.length!==0) ? (
                    <div className="d-inline-block col-6">
                        <div className="row h5 text-success">
                    Завершенные анкеты
                    </div>
                    <div className="row">
                        <ListGroup>
                            {this.props.filled_assessment_profiles.map((prof)=>{
                                return(
                                    <RenderFilledProfile profile={prof} />
                                );
                            })}
                        </ListGroup>
                    </div>
                    </div>
                ) :
                (<div/>)
                const Unfilled=(this.props.assessment_profiles.length!==0) ? (
                    <div className="d-inline-block col-6">
                        <div className="row h5 text-danger">
                    Незавершенные анкеты
                    </div>
                    <div className="row">
                        <ListGroup>
                            {this.props.assessment_profiles.map((prof)=>{
                                return(
                                    <RenderUnFilledProfile profile={prof} />
                                );
                            })}
                        </ListGroup>
                    </div>
                    </div>
                ):
                (<div/>)
                return (
                    <div className="container">
                        <div className="row">
                            <div className="col-12 ">
                                <h3>Оценка</h3>
                                <hr />
                            </div>
                        </div>
                        {main}
                        <hr/>
                        {filled}
                        {Unfilled}
                    </div>
                );
            }
        }
    }

export default AssessmentResult;