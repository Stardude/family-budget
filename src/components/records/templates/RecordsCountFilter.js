import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';

import { addFilter } from '../../../actions/filters';
import { startGetRecordsForAccount } from '../../../actions/records';

class RecordsCountFilter extends React.Component {
    state = {
        countValue: this.props.countValues[0]
    };

    onChange = newState => {
        this.props.applyFilterToRecords({
            ...this.props.filters,
            limit: newState.countValue.value,
            offset: 0
        });

        this.setState(newState);
    };

    render() {
        return (
            <div className="list-item__section" style={{ width: '9rem' }} >
                <Select
                    className="list-item__select-container"
                    classNamePrefix="list-item__select"
                    value={this.state.countValue}
                    onChange={countValue => this.onChange({countValue})}
                    options={this.props.countValues}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    filters: state.filters,
    countValues: [
        { label: '10', value: 10 },
        { label: '100', value: 100 },
        { label: 'ALL', value: null }
    ]
});

const mapDispatchToProps = (dispatch) => ({
    applyFilterToRecords: (filter) => {
        dispatch(addFilter(filter));
        dispatch(startGetRecordsForAccount(filter));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordsCountFilter);
