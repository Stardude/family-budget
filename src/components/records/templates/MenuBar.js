import React from 'react';
import queryString from "query-string";

import NewRecord from '../NewRecord';
import MenuBar from '../../general/MenuBar';
import RecordsCategoryFilter from './RecordsCategoryFilter';
import RecordsDateFilter from './RecordsDateFilter';
import RecordsCountFilter from './RecordsCountFilter';
import RecordsNavigationFilter from './RecordsNavigationFilter';

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
                <RecordsCategoryFilter />
                <RecordsDateFilter />
                <RecordsCountFilter />
                <RecordsNavigationFilter />
            </MenuBar>
        );
    }
}

export default RecordsMenuBar;
