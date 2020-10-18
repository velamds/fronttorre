import React, { Component } from 'react'
import { Link} from 'react-router-dom';

export default class Job extends Component {
    state = {
        job: ''
    }
    async componentDidMount(){
        const url = 'https://torre.co/api/opportunities/'+this.props.match.params.id
        const result = await fetch(url)
        const data = await result.json()
        this.setState({job: data})
    }
    render(){
        return(
            <div>
                <h2>Oportunidad de  Empleo</h2>
                    <div className="card" key={this.state.job.id}>
                        <h5 className="card-header">{this.state.job.objective}</h5>
                        <div className="card-body">
                            <p className="card-text">
                                {JSON.stringify(this.state.job.objective)}
                            </p>
                        </div>
                        <Link to='/' className='btn btn-info'>Volver</Link>
                    </div>
            </div>
        )
    }


}