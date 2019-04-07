import React from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

class MenuBar extends React.Component {
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
                    {/*<div className="list-item__section">*/}
                        {/*<button className="button" onClick={e => axios.post('/api/configuration/drop')*/}
                            {/*.then(response => window.location.reload())}>Drop Database</button>*/}
                    {/*</div>*/}
                </div>
            </div>
        );
    }
}

export default MenuBar;
