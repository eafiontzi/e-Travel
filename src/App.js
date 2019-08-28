import React, { Component } from 'react';

class App extends Component {
    state = {
        movies: []
    };
    componentDidMount() {
        fetch('https://star-wars-api.herokuapp.com/films')
            .then(res => res.json())
            .then((data) => {
                this.setState({ movies: data });
                console.log(this.state.movies);
            })
            .catch(console.log)
    }
    render() {
        return (
            <div className="container">
                <div className="col-12 col-lg-6">
                    <div className="card">
                        <ul className="list-group list-group-flush">
                          {this.state.movies.map((movies) => (
                              <li className="list-group-item d-flex justify-content-between">
                                  <div>Episode {movies.fields.episode_id}</div>
                                  <div>{movies.fields.title}</div>
                                  <div>{movies.fields.release_date}</div>
                              </li>
                          ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
export default App;