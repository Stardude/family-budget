import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';

import { convertToSelectList } from '../../../utils/utils';
import { addFilter } from '../../../actions/filters';
import { startGetRecordsForAccount } from '../../../actions/records';

class RecordsCategoryFilter extends React.Component {
    state = {
        category: this.props.categories[0]
    };

    onChange = newState => {
        this.props.applyFilterToRecords({
            ...this.props.filters,
            categoryId: newState.category.value
        });

        this.setState(newState);
    };

    render() {
        return (
            <div className="list-item__section" style={{ width: '20rem' }} >
                <Select
                    className="list-item__select-container"
                    classNamePrefix="list-item__select"
                    value={this.state.category}
                    onChange={category => this.onChange({category})}
                    options={this.props.categories}
                    autoFocus
                />
            </div>
        );
    }
}

const addDisplayAllValue = categories => [{ id: null, name: 'Show All' }].concat(categories);

const mapStateToProps = state => ({
    filters: state.filters,
    categories: convertToSelectList(addDisplayAllValue(state.categories), 'name', 'id')
});

const mapDispatchToProps = dispatch => ({
    applyFilterToRecords: (filter) => {
        dispatch(addFilter(filter));
        dispatch(startGetRecordsForAccount(filter));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordsCategoryFilter);
