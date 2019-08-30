import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    }

    componentDidMount() {
        fetch('https://star-wars-api.herokuapp.com/films')
            .then(res => res.json())
            .then((data) => {
                this.setState({ list: data });
                console.log(this.state.list);
            })
            .catch(console.log)
    }

    render() {
        return (
            <div className="container">
                <List items={this.state.list} />
            </div>
        );
    }
}

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtered: [],
            description: "No movie selected",
            titleDescription: "",
            producer: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            filtered: this.props.items
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            filtered: nextProps.items
        });
    }

    handleClick = (event, description, title, producer) => {
        //set specific episode details
        this.setState({ description: description });
        this.setState({ titleDescription: title });
        this.setState({ producer: "Directed By: " + producer });
    };

    handleChange(e) {
        let currentList = [];
        let newList = [];

        // If the search bar isn't empty
        if (e.target.value !== "") {
            currentList = this.props.items;

            // Use .filter() to determine which movies should be displayed
            // based on the search terms
            newList = currentList.filter(item => {
                const lc = item.fields.title.toLowerCase();
                const filter = e.target.value.toLowerCase();
                // If current movie title includes the search term it will be added to newList.
                return lc.includes(filter);
            });
        } else {
            // If the search bar is empty, set newList to original task list
            newList = this.props.items;
        }
        this.setState({
            filtered: newList
        });
    }

    render() {
        return (
            <div>
                <div className="row py-4">
                    <input type="text" className="search form-control" onChange={this.handleChange} placeholder="Search..."/>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-6">
                        <div className="card">
                            <ul className="list-group list-group-flush">
                                {this.state.filtered.map((movie) => (
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
        )
    }
}

export default App;