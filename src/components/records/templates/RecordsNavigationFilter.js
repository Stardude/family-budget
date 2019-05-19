import React from 'react';
import { connect } from 'react-redux';

import { addFilter } from '../../../actions/filters';
import { startGetRecordsForAccount } from '../../../actions/records';

class RecordsNavigationFilter extends React.Component {
    onChange = newState => {
        this.props.applyFilterToRecords({
            ...this.props.filters,
            offset: newState.offset
        });
    };

    calculateOffset = (direction) => {
        if (direction < 0) {
            return this.props.filters.offset < this.props.filters.limit ?
                0 :
                this.props.filters.offset - this.props.filters.limit;
        }

        if (direction > 0) {
            return this.props.filters.offset + this.props.filters.limit;
        }
    };

    render() {
        return (
            <div className="list-item__section" style={{ width: '9rem' }} >
                <button
                    className="button remove-right-border"
                    onClick={e => this.onChange({ offset: this.calculateOffset(-1) })}
                    disabled={ this.props.filters.offset < this.props.filters.limit }
                >
                    {'⬅'}
                </button>
                <button
                    className="button remove-left-border"
                    style={{ 'marginLeft': '-0.5rem' }}
                    onClick={e => this.onChange({ offset: this.calculateOffset(1) })}
                >
                    {'➡'}
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
    applyFilterToRecords: (filter) => {
        dispatch(addFilter(filter));
        dispatch(startGetRecordsForAccount(filter));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordsNavigationFilter);
