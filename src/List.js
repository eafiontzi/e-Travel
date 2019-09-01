import React, { Component } from 'react';

class List extends Component {
    constructor(props) {
        super(props);
        //set initial values to variables
        this.state = {
            filtered: [],
            description: "No movie selected",
            titleDescription: "",
            producer: "",
            isOpen: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSort = this.onSort.bind(this)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            filtered: nextProps.items
        });
    }

    // static getDerivedStateFromProps(props, state) {
    //     // Store prevId in state so we can compare when props change.
    //     // Clear out previously-loaded data (so we don't render stale stuff).
    //     if (props.id !== state.prevId) {
    //         return {
    //             filtered: props.items,
    //         };
    //     }
    //
    //     // No state update necessary
    //     return null;
    // }

    //get filtered movies
    componentDidMount() {
        this.setState({
            filtered: this.props.items
        });
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (this.state.filtered === null) {
    //         return {
    //             filtered: this.props.items
    //         };
    //     }
    // }

    //set specific episode details
    handleClick = (event, description, title, producer) => {
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

    //toggle the sort dropdown-menu
    toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

    onSort(event, sortKey){
        //get existing filtered movies
        const data = this.state.filtered;
        //sort them according to selected field
        data.sort((a,b) => a.fields[sortKey].localeCompare(b.fields[sortKey]));
        //save the new sorted data to filtered
        this.setState({
            filtered: data
        });
    }

    render() {
        //toggle dropdown menu class
        const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;

        return (
            <div>
                <div className="row py-4">
                    <div className="col-4 col-lg-2">
                        <div className="dropdown" onClick={this.toggleOpen}>
                            <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                            >
                                Sort by..
                            </button>
                            <div className={menuClass} aria-labelledby="dropdownMenuButton">
                                <button className="dropdown-item" onClick={e => this.onSort(e, 'release_date')}>Year</button>
                                <button className="dropdown-item" onClick={e => this.onSort(e, 'title')}>Episode</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-8 col-lg-10">
                        <input type="text" className="search form-control" onChange={this.handleChange} placeholder="Type to search..."/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-6 pb-4 pb-lg-0">
                        <div className="card">
                            <ul className="list-group list-group-flush">
                                {this.state.filtered.map((movie) => (
                                    <li onClick={((e) => this.handleClick(e, movie.fields.opening_crawl, movie.fields.title, movie.fields.producer ))} key={movie.fields.episode_id} id={movie.fields.episode_id} className="list-group-item d-flex justify-content-between">
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

export default List;