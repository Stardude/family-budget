import React from 'react';
import DatePicker from 'react-date-picker';
import { connect } from 'react-redux';

import { convertToSelectList } from '../../../utils/utils';
import { addFilter } from '../../../actions/filters';
import { startGetRecordsForAccount } from '../../../actions/records';

class RecordsCategoryFilter extends React.Component {
    state = {
        date: null
    };

    onChange = newState => {
        this.props.applyFilterToRecords({
            ...this.props.filters,
            date: newState.date
        });

        this.setState(newState);
    };

    render() {
        return (
            <div className="list-item__section">
                <DatePicker
                    className="list-item__date-picker"
                    calendarClassName="list-item__react-calendar"
                    value={this.state.date}
                    calendarIcon={null}
                    showLeadingZeros={true}
                    onChange={date => this.onChange({date})}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    filters: state.filters,
    categories: convertToSelectList(state.categories, 'name', 'id')
});

const mapDispatchToProps = dispatch => ({
    applyFilterToRecords: (filter) => {
        dispatch(addFilter(filter));
        dispatch(startGetRecordsForAccount(filter));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordsCategoryFilter);
