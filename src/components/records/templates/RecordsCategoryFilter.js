import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';

import { filterRecords } from '../../../actions/records';

import { convertToSelectList } from '../../../utils/utils';

class RecordsCategoryFilter extends React.Component {
    state = {
        category: null
    };

    onChange = newState => {
        this.props.dispatch(filterRecords({
            type: 'EQUAL',
            field: 'categoryId',
            value: newState.category.value
        }));
        this.setState(newState);
    };

    render() {
        return (
            <div className="list-item__section" style={{ width: '20rem' }} >
                <Select
                    className="list-item__select-container"
                    classNamePrefix="list-item__select"
                    placeholder="Select category..."
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
    categories: convertToSelectList(addDisplayAllValue(state.categories), 'name', 'id')
});

export default connect(mapStateToProps)(RecordsCategoryFilter);
