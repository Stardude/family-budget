import React from 'react';
import { connect } from 'react-redux';

import Record from './Record';

import { startGetRecordsForAccount } from '../../actions/records';
import { startGetAllCategories } from '../../actions/categories';
import { addFilter } from '../../actions/filters';

const defaultOrderFields = [
    {
        field: 'recordDate',
        direction: 'DESC'
    },
    {
        field: 'id',
        direction: 'DESC'
    }
];

const mapOrderFieldsToString = orderList => orderList.map(o => `${o.field}|${o.direction}`).join(',');

class RecordList extends React.Component {
    state = {
        accountId: this.props.accountId
    };

    componentWillMount() {
        const accountId = this.state.accountId || parseInt(this.props.match.params.id);

        this.props.getRecords({
            ...this.props.filters,
            accountId,
            orderFields: mapOrderFieldsToString(defaultOrderFields),
            limit: 10,
            offset: 0
        });

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
    records: state.records,
    filters: state.filters,
    accountId: state.accounts.length !== 0 ?
        state.accounts.filter(account => account.id === parseInt(props.match.params.id))[0].id :
        null
});

const mapDispatchToProps = (dispatch) => ({
    getRecords: (filter) => {
        dispatch(addFilter(filter));
        dispatch(startGetRecordsForAccount(filter));
    },
    getCategories: () => dispatch(startGetAllCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordList);
