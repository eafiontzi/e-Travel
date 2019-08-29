import React, { Component } from 'react';

class App extends Component {
    state = {
        movies: [],
        description: "No movie selected",
        titleDescription: "",
        producer: ""
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

    handleClick = (event, description, title, producer) => {
        this.setState({ description: description });
        this.setState({ titleDescription: title });
        this.setState({ producer: "Directed By: " + producer });
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-6">
                        <div className="card">
                            <ul className="list-group list-group-flush">
                              {this.state.movies.map((movie) => (
                                  <li onClick={((e) => this.handleClick(e, movie.fields.opening_crawl, movie.fields.title, movie.fields.producer ))} id={movie.fields.episode_id} className="list-group-item d-flex justify-content-between">
                                      <div>Episode {movie.fields.episode_id}</div>
                                      <div className="font-weight-bold">{movie.fields.title}</div>
                                      <div>{movie.fields.release_date}</div>
                                  </li>
                              ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6">
                        <h3 className="py-2">
                            {this.state.titleDescription}
                        </h3>
                        <div>
                            {this.state.description}
                        </div>
                        <div className="py-2">
                            {this.state.producer}
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
export default App;