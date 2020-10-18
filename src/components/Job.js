import React, { Component } from 'react'
import { Link} from 'react-router-dom';

export default class Job extends Component {
    state = {
        job: {
            attachments: [],
            details: [],
            created:'',
            strengths:[]
        },
    }
    async componentDidMount(){
        const url = 'https://torre.co/api/opportunities/'+this.props.match.params.id
        const result = await fetch(url)
        const data = await result.json()
        this.setState({job: data})

    }

    Strengths(strengths){
        return <div>
                <span>Fortalezas: </span>
                {strengths.map(
                    strength =>{
                        return <span className="badge badge-info">
                                {strength.name}
                        </span>
                    }
                )}
        </div>
    }

    Compensation(compensation){
        let response = <span className="badge badge-info">A Convenir</span>;
        if(compensation){
                return <div>
                    <span className="badge badge-info">
                        {compensation.currency}
                    </span>
                    <span className="badge badge-primary">
                        Desde: {new Intl.NumberFormat(
                                    'us-US',
                                    {
                                        style: 'currency', 
                                        currency: compensation.currency.substr(0, 3),
                                        minimumFractionDigits: 0
                                    }
                                    ).format(compensation.minAmount)}
                    </span>
                    <span className="badge badge-success">
                        Hasta: {new Intl.NumberFormat(
                                    'us-US',
                                    {
                                        style: 'currency', 
                                        currency: compensation.currency.substr(0, 3),
                                        minimumFractionDigits: 0
                                    }
                                    ).format(compensation.maxAmount)}
                    </span>
                    <span className="badge badge-dark">
                        {compensation.periodicity}
                    </span>
                </div>
        }else{
            return response;
        } 
    }

    render(){
        return(
            <div className="container">
                <div className='text-center'>
                    <img
                        src={this.state.job.attachments.map(
                            att => att.address
                        )}
                        className="img-fluid img-responsive"
                    >
                    </img>
                </div>
                    <div className="card" key={this.state.job.id}>
                        <h5 className="card-header">{this.state.job.objective}
                            <div className="float-right"> {this.Compensation(this.state.job.compensation)} </div>
                        </h5>
                        <div className="card-body">
                            <p className="card-text">
                                <p>
                                <strong>Sobre Nosotros</strong>
                                 {this.state.job.details.map(
                                        detail =>
                                        {
                                            if(detail.code=='organizations'){
                                                return <li>{detail.content}</li>
                                            }
                                        }                                             
                                     )
                                 }
                                </p>
                                <p>
                                <strong>Detalle Oferta</strong>
                                 {this.state.job.details.map(
                                        detail =>
                                        {
                                            if(detail.code=='reason'){
                                                return <li>{detail.content}</li>
                                            }
                                        }                                             
                                     )
                                 }
                                </p>
                                <p>

                                <p>
                                <strong>Responsabilidades</strong>
                                 {this.state.job.details.map(
                                        detail =>
                                        {
                                            if(detail.code=='responsibilities'){
                                                return <li>{detail.content}</li>
                                            }
                                        }                                             
                                     )
                                 }
                                </p>

                                <p>
                                <strong>Requirements</strong>
                                 {this.state.job.details.map(
                                        detail =>
                                        {
                                            if(detail.code=='requirements'){
                                                return <li>{detail.content}</li>
                                            }
                                        }                                             
                                     )
                                 }
                                </p>
                                <p>
                                <strong>Beneficios</strong>
                                 {this.state.job.details.map(
                                        detail =>
                                        {
                                            if(detail.code=='benefits'){
                                                return <li>{detail.content}</li>
                                            }
                                        }                                             
                                     )
                                 }
                                </p>
                                
                                <p>
                                <strong>Adicional</strong>
                                 {this.state.job.details.map(
                                        detail =>
                                        {
                                            if(detail.code=='additional'){
                                                return <li>{detail.content}</li>
                                            }
                                        }                                             
                                     )
                                 }
                                </p>
                                
                            </p>
                            {this.Strengths(this.state.job.strengths)}
                            <label>Fecha de publicacción: {this.state.job.created.substr(0,10)}</label>    
                            </p>
                        </div>
                        <Link to='/fronttorre/' className='btn btn-info'>Volver</Link>
                    </div>
            </div>
        )
    }


}