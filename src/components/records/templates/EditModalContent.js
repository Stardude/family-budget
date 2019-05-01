import React from 'react';
import Select from 'react-select';
import DatePicker from 'react-date-picker';
import { connect } from 'react-redux';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';

import Checkbox from '../../general/Checkbox';

import { convertToSelectList } from '../../../utils/utils';

class EditModalContent extends React.Component {
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
            <form onSubmit={this.onSubmit} onKeyUp={this.props.onCancel} >
                <ReactTooltip place="top" type="light" effect="solid" />
                <div className="list-item">
                    <div className="list-item__section size-30">
                        <div>Category:</div>
                    </div>
                    <div className="list-item__section size-70">
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
                </div>
                <div className="list-item">
                    <div className="list-item__section size-30">
                        <div>Price:</div>
                    </div>
                    <div className="list-item__section size-70">
                        <input className="list-item__input" type="text" name="price" placeholder="Price" defaultValue={this.props.price} />
                    </div>
                </div>
                <div className="list-item">
                    <div className="list-item__section size-30">
                        <div>Amount:</div>
                    </div>
                    <div className="list-item__section size-70">
                        <input className="list-item__input" type="text" name="amount" placeholder="Amount" defaultValue={this.props.amount || 1} />
                    </div>
                </div>
                <div className="list-item">
                    <div className="list-item__section size-30">
                        <div>Comment:</div>
                    </div>
                    <div className="list-item__section size-70">
                        <input className="list-item__input" type="text" name="comment" placeholder="Comment" defaultValue={this.props.comment} />
                    </div>
                </div>
                <div className="list-item">
                    <div className="list-item__section size-30">
                        <div>Is Income:</div>
                    </div>
                    <div className="list-item__section size-70">
                        <Checkbox className="list-item__input" name="isIncome" defaultChecked={this.props.isIncome === 'true'} />
                    </div>
                </div>
                <div className="list-item">
                    <div className="list-item__section size-30">
                        <div>Date:</div>
                    </div>
                    <div className="list-item__section size-70">
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
                </div>
                <div className="list-item list-item--justify-end">
                    <div className="list-item__section">
                        <button className="button">Save</button>
                    </div>
                    <div className="list-item__section">
                        <button className="button" onClick={this.props.onCancel}>Cancel</button>
                    </div>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    categories: convertToSelectList(state.categories, 'name', 'id')
});

export default connect(mapStateToProps)(EditModalContent);
