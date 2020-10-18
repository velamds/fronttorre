import React, { Component } from 'react';
import { BrowserRouter as Router , Route} from 'react-router-dom';
import './App.css';

import Jobs from './components/Jobs';
import Job from './components/Job';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      jobs: [],
      keyword: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    this.setState({keyword: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();
    this.searchJobs();
  }

  searchJobs = () => {
    const requestOptions  = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(
              {
                  "skill/role":   {
                      "text":this.state.keyword,
                      "experience":"potential-to-develop"
                  }
              })
      }
      fetch('https://search.torre.co/opportunities/_search/?currency=USD%24&page=0&periodicity=hourly&lang=es&size=20&aggregate=false&offset=0',requestOptions)
      .then(response => response.json())
      .then(data => this.setState({jobs: data.results}))
  }

  render(){
    return (
      <div>
        <Router>
          <Route exact path='/fronttorre/' render={() => {
            return <div className="container">
              <h2>Torre.co by Velamds
                <img src="https://avatars2.githubusercontent.com/u/19848803?s=460&u=6d72ab7fa5f291b61819129c0d2f7a227bdd65eb&v=4" className="rounded-circle" alt="@Velamds" width="3%"></img>
              </h2>
              <form>
                <div className="row">
                  <p className="col-sm-12">Escribe la habilidad en la que buscas empleo</p>
                  <div className="col-sm-10">
                    <input type="text" className="form-control"
                    value={this.state.keyword}
                    onChange={this.handleChange}
                    />
                  </div>
                  <div className="col-sm-2">
                    <button 
                      type="submit"                
                      className="btn btn-primary"
                      onClick={this.handleSubmit}
                    >
                      Buscar
                    </button>
                  </div>
                </div>  
              </form>
              <Jobs jobs={this.state.jobs}/>
            </div>
            }}>
          </Route>
          <Route path='/fronttorre/job/:id' component={Job}/>
        </Router>
      </div>
    );
  }
}

export default App;
