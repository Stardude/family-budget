import React from 'react';
import { Link } from 'react-router-dom';

import Configuration from '../configuration/Configuration';

class MenuBar extends React.Component {
    state = {
        showModal: false
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
                        <Configuration />
                    </div>
                </div>
            </div>
        );
    }
}

export default MenuBar;
