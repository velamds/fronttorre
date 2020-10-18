import React, { Component } from 'react'
import { Link} from 'react-router-dom';

export default class Jobs extends Component {

    Compensation(compensation){
        let response = <span className="badge badge-info">A Convenir</span>;
        if(compensation){
            if(compensation.data){
                return <div>
                    <span className="badge badge-info">
                        {compensation.data.currency}
                    </span>
                    <span className="badge badge-primary">
                        Desde: {new Intl.NumberFormat(
                                    'us-US',
                                    {
                                        style: 'currency', 
                                        currency: compensation.data.currency.substr(0, 3),
                                        minimumFractionDigits: 0
                                    }
                                    ).format(compensation.data.minAmount)}
                    </span>
                    <span className="badge badge-success">
                        Hasta: {new Intl.NumberFormat(
                                    'us-US',
                                    {
                                        style: 'currency', 
                                        currency: compensation.data.currency.substr(0, 3),
                                        minimumFractionDigits: 0
                                    }
                                    ).format(compensation.data.maxAmount)}
                    </span>
                    <span className="badge badge-dark">
                        {compensation.data.periodicity}
                    </span>
                </div>
            }else{
                return response;
            }
        }else{
            return response;
        } 
    }

    Skills(skills){
        return <div>
                <span>Habilidades: </span>
                {skills.map(
                    skill =>{
                        return <span className="badge badge-info">
                                {skill.name}
                        </span>
                    }
                )}
        </div>
    }

    render(){
        return(
            <div className='row'>
                {this.props.jobs.length ?
                <h3 className='col-sm-12'>Resultados</h3>
                : ""}
                {
                    this.props.jobs.map(
                        job => {
                            return <div className='col-sm-6'>
                                <div className="card" key={job.id}>
                                        <h5 className="card-header">{job.objective}
                                            <label className='float-right text-success'>
                                                {this.Compensation(job.compensation)}
                                            </label>
                                        </h5>
                                        <div className="card-body">
                                            <div className="card-text">
                                                {job.organizations.map(
                                                    organization =>{
                                                        return <div>
                                                            <img src={organization.picture} className="rounded-circle" width="10%" alt={organization.name} ></img>
                                                            <p>{organization.name}</p>
                                                        </div>
                                                    }
                                                )}
                                                Tipo: {job.type}
                                                {this.Skills(job.skills)}
                                                <Link to={"job/"+job.id} className="btn btn-primary float-right">Postularse</Link>
                                            </div>
                                            
                                            
                                            
                                        </div>
                                </div>
                                <br></br>
                            </div>
                        }
                    )
                }
            </div>
        )
    }


}