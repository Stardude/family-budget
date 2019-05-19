import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Checkbox from '../general/Checkbox';

class ConfigurationModal extends React.Component {
    state = {
        configuration: {}
    };

    componentWillMount() {
        this.getConfiguration();
    }

    getConfiguration = () => {
        axios.get('/api/configuration').then(response => {
            this.setState({
                configuration: response.data
            });
        });
    };

    onSubmit = (e) => {
        e.preventDefault();

        const accountIds = [];
        this.props.accounts.forEach(account => {
            if (e.target['checkbox' + account.id] && e.target['checkbox' + account.id].checked) {
                accountIds.push(account.id);
            }
        });

        const newConfiguration = {
            ...this.state.configuration,
            accountIdsToIncludeIntoTotalBalance: accountIds
        };
        axios.post('/api/configuration', newConfiguration).then(response => {
            this.props.onSubmit();
        });
    };

    isAccountIncluded = accountId => {
        const accountIds = this.state.configuration.accountIdsToIncludeIntoTotalBalance;
        return accountIds && accountIds.includes(accountId);
    };

    render () {
        return (
            <form onSubmit={this.onSubmit} onKeyUp={this.props.onCancel} >
                <div className="list-item list-item--no-border">
                    <span>List of accounts to include into total balance calculation:</span>
                </div>
                {this.props.accounts.map(account => {
                    return (
                        <div className="list-item list-item--no-border" key={account.id}>
                            <div className="list-item__section size-90">
                                <div>{account.name}</div>
                            </div>
                            <div className="list-item__section size-10">
                                <Checkbox className="list-item__input" name={'checkbox' + account.id} defaultChecked={this.isAccountIncluded(account.id)} />
                            </div>
                        </div>
                    );
                })}
                <div className="list-item list-item--justify-end">
                    <div className="list-item__section">
                        <button className="button">Save</button>
                    </div>
                    <div className="list-item__section">
                        <button className="button" onClick={this.props.onCancel}>Cancel</button>
                    </div>
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => ({
    accounts: state.accounts
});

export default connect(mapStateToProps)(ConfigurationModal);
