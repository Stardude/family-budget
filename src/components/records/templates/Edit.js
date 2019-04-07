import React from 'react';
import Select from 'react-select';
import DatePicker from 'react-date-picker';
import { connect } from 'react-redux';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';

import Checkbox from '../../general/Checkbox';

class Edit extends React.Component {
    state = {
        category: this.props.name ? { label: this.props.name, value: this.props.categoryId } : null,
        date: this.props.recordDate ? moment(this.props.recordDate).toDate() : moment().startOf('day').toDate()
    };

    onChange = (newState) => {
        this.setState(newState);
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(e, this.state.category.value, this.state.date);
    };

    render() {
        return (
            <form className="list-item" onSubmit={this.onSubmit} onKeyUp={this.props.onCancel} >
                <ReactTooltip place="top" type="light" effect="solid" />
                <div className="list-item__section size-25">
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
                <div className="list-item__section size-15">
                    <DatePicker
                        className="list-item__date-picker"
                        calendarClassName="list-item__react-calendar"
                        value={this.state.date}
                        clearIcon={null}
                        calendarIcon={null}
                        showLeadingZeros={true}
                        onChange={date => this.onChange({date})}
                    />
                </div>
                <div data-tip="is income?" className="list-item__section size-5">
                    <Checkbox className="list-item__input" name="isIncome" defaultChecked={this.props.isIncome === 'true'} />
                </div>
                <div className="list-item__section size-10">
                    <input className="list-item__input" type="text" name="price" placeholder="Price" defaultValue={this.props.price} />
                </div>
                <div className="list-item__section size-5">
                    <input className="list-item__input" type="text" name="amount" placeholder="Amount" defaultValue={this.props.amount || 1} />
                </div>
                <div className="list-item__section size-25">
                    <input className="list-item__input" type="text" name="comment" placeholder="Comment" defaultValue={this.props.comment} />
                </div>
                <div className="list-item__section size-15 align-right">
                    <button className="button">Save</button>
                    <button className="button" onClick={this.props.onCancel}>Cancel</button>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    categories: state.categories.map(category => ({ label: category.name, value: category.id }))
});

export default connect(mapStateToProps)(Edit);
