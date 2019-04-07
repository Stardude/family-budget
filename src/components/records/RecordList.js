import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Record from './Record';

import { startGetRecordsForAccount } from "../../actions/records";
import { startGetAllCategories } from "../../actions/categories";

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
    records: state.records.sort((a, b) => moment(a.recordDate).isAfter(b.recordDate) ? -1 :
        (moment(a.recordDate).isBefore(b.recordDate) ? 1 : (a.id > b.id ? -1: 1))),
    accountId: state.accounts.length !== 0 ?
        state.accounts.filter(account => account.id === parseInt(props.match.params.id))[0].id :
        null
});

const mapDispatchToProps = (dispatch) => ({
    getRecords: (accountId) => dispatch(startGetRecordsForAccount(accountId)),
    getCategories: () => dispatch(startGetAllCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordList);
