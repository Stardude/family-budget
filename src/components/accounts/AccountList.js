import React from 'react';
import { connect } from 'react-redux';

import Account from './Account';

import { startGetAllAccounts } from '../../actions/accounts';

class AccountList extends React.Component {
    componentDidMount() {
        this.props.dispatch(startGetAllAccounts());
    }

    render() {
        return (
            <div className="list">
                {this.props.accounts.map(account =>
                    <Account {...account}
                             key={account.id} />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    accounts: state.accounts.sort((a, b) => a.name.localeCompare(b.name))
});

export default connect(mapStateToProps)(AccountList);
