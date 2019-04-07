import React from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

import ModalWindow from "./ModalWindow";
import DeleteModalContent from "./DeleteModalContent";

class MenuBar extends React.Component {
    state = {
        showModal: false
    };

    decode = input => {
        let output = "";
        for (let i = 0; i < input.length; i++) {
            output += input[i].charCodeAt(0).toString(16);
        }
        return output;
    };

    onSubmit = e => {
        e.preventDefault();
        const password = e.target.password.value.trim();

        if (this.decode(password) === '465050617373776f726431323334') {
            axios.post('/api/configuration/drop')
                .then(response => window.location.reload());
        }
    };

    onCancel = e => {
        if (e.type === 'click' || e.keyCode === 27) {
            this.setState({ showModal: false });
        }
    };

    render () {
        return (
            <div className="list">
                <div className="list-item">
                    {this.props.children}
                    <div className="list-item__section list-item__section--align-end">
                        <Link className="button" to="/">Accounts</Link>
                    </div>
                    <div className="list-item__section">
                        <Link className="button" to="/categories">Categories</Link>
                    </div>
                    <div className="list-item__section">
                        <button className="button" onClick={e => this.setState({ showModal: true })}>Drop Database</button>
                    </div>
                    {this.state.showModal &&
                    <ModalWindow isOpen={this.state.showModal} onClose={this.onCancel}>
                        <DeleteModalContent onSubmit={this.onSubmit} onCancel={this.onCancel} >
                            <p>ARE YOU SURE YOU WANT TO DROP THE ENTIRE DATABASE ???</p>
                            <br/>
                            <input type="text"
                                   name="password"
                                   placeholder="Password"
                                   className="list-item__input"
                                   autoFocus/>
                        </DeleteModalContent>
                    </ModalWindow>}
                </div>
            </div>
        );
    }
}

export default MenuBar;
