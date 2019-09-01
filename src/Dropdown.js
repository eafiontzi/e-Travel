import React, { Component } from 'react';

class Dropdown extends Component {
    state = {
        isOpen: false
    };

    toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

    render() {

        const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;
        return (
            <div className="dropdown" onClick={this.toggleOpen}>
                <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                >
                    Sort by...
                </button>
                <div className={menuClass} aria-labelledby="dropdownMenuButton">
                    <button className="dropdown-item" onClick={this.props.onSortYear}>Year</button>
                    <button className="dropdown-item" onClick={this.props.onSortEpis}>Episode</button>
                </div>
            </div>
        );
    }
}

export default Dropdown;