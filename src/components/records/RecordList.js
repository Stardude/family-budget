import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Record from './Record';

import { startGetRecordsForAccount } from "../../actions/records";
import { startGetAllCategories } from "../../actions/categories";

import { filterRecords, sortRecords } from '../../utils/utils';

class RecordList extends React.Component {
    state = {
        accountId: this.props.accountId
    };

    componentWillMount() {
        const accountId = this.state.accountId || parseInt(this.props.match.params.id);

        this.props.getRecords(accountId);
        this.props.getCategories();
        this.setState({ accountId });
    }

    render() {
        return (
            <div className="list">
                {this.props.records.map(record =>
                    <Record {...record}
                            key={record.id}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    records: sortRecords(filterRecords(state.records)),
    accountId: state.accounts.length !== 0 ?
        state.accounts.filter(account => account.id === parseInt(props.match.params.id))[0].id :
        null
});

const mapDispatchToProps = (dispatch) => ({
    getRecords: (accountId) => dispatch(startGetRecordsForAccount(accountId)),
    getCategories: () => dispatch(startGetAllCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordList);
