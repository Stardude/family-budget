import React from 'react';
import queryString from "query-string";

import NewRecord from '../NewRecord';
import MenuBar from '../../general/MenuBar';

class RecordsMenuBar extends React.Component {
    state = {
        isAddNewListItem: false
    };

    componentWillMount() {
        if (queryString.parse(this.props.location.search).newRecord === 'true') {
            this.props.history.replace({search: ''});
            this.setState({ isAddNewListItem: true } );
        }
    }

    render () {
        return (
            <MenuBar>
                <NewRecord
                    accountId={parseInt(this.props.match.params.id)}
                    isAddNewListItem={this.state.isAddNewListItem}
                />
            </MenuBar>
        );
    }
}

export default RecordsMenuBar;
