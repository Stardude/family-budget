import React from 'react';

import Static from './templates/StaticContent';

class Account extends React.Component {
    render() {
        return (
            <Static {...this.props} />
        );
    }
}

export default Account;
