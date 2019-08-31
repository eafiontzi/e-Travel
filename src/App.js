import React, { Component } from 'react';
import List from "./List";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    }

    //get movies from endpoint
    componentDidMount() {
        fetch('https://star-wars-api.herokuapp.com/films')
            .then(res => res.json())
            .then((data) => {
                this.setState({ list: data });
                console.log(this.state.list);
            })
            .catch(console.log)
    }

    //return the list
    render() {
        return (
            <div className="container">
                <List items={this.state.list} />
            </div>
        );
    }
}

export default App;