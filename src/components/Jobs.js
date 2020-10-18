import React, { Component } from 'react'

export default class Jobs extends Component {

    render(){
        return(
            <div>
                {this.props.jobs.length ?
                <h2>Empleos</h2>
                : ""}
                {
                    this.props.jobs.map(
                        job => {
                            return <div key={job.id}>
                                <p>{job.objective}</p>
                            
                            </div>
                        }
                    )
                }
            </div>
        )
    }


}