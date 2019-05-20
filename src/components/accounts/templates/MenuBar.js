import React from 'react';

import NewAccount from '../NewAccount';
import MenuBar from '../../general/MenuBar';

class AccountMenuBar extends React.Component {
    render () {
        return (
            <MenuBar>
                <NewAccount />
            </MenuBar>
        );
    }
}

export default AccountMenuBar;
