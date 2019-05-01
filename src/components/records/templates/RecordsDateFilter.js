import React from 'react';
import DatePicker from "react-date-picker";
import { connect } from 'react-redux';

import { convertToSelectList } from '../../../utils/utils';
import { filterRecords } from "../../../actions/records";

class RecordsCategoryFilter extends React.Component {
    state = {
        date: null
    };

    onChange = newState => {
        this.props.dispatch(filterRecords({
            type: 'DATE_LESS',
            field: 'recordDate',
            value: newState.date
        }));
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
    categories: convertToSelectList(state.categories, 'name', 'id')
});

export default connect(mapStateToProps)(RecordsCategoryFilter);
