import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import DatePicker from 'react-date-picker';
import moment from 'moment';

import { convertToSelectList } from '../../../utils/utils';

class TransferModalContent extends React.Component {
    state = {
        destination: null,
        amount: '',
        rate: 1,
        total: '',
        comment: '',
        date: moment().startOf('day').toDate()
    };

    onChange = (newState) => {
        if (!isNaN(newState.amount)) {
            newState.amount = +newState.amount;
            newState.total = newState.amount * this.state.rate;
        } else if (!isNaN(newState.rate)) {
            newState.rate = +newState.rate;
            newState.total = this.state.amount ? this.state.amount * newState.rate : '';
        } else if (!isNaN(newState.total)) {
            newState.total = +newState.total;
            newState.rate = this.state.amount ? newState.total / this.state.amount : 1;
        }

        this.setState(newState);
    };

    onSubmit = (e) => {
        e.preventDefault();

        const destination = this.state.destination.value;
        const destinationName = this.state.destination.label;
        const amount = this.state.amount;
        const rate = this.state.rate;
        const total = this.state.total;
        const comment = this.state.comment;
        const date = this.state.date;

        this.props.onSubmit({
            destination,
            destinationName,
            amount,
            rate,
            total,
            comment,
            date
        });
    };

    render() {
        return (
            <form onSubmit={this.onSubmit} onKeyUp={this.props.onCancel} >
                {this.props.error && <div className="list-item__title-error">{this.props.error}</div>}
                <div className="list-item">
                    <div className="list-item__section size-30">
                        <div>From:</div>
                    </div>
                    <div className="list-item__section size-70">
                        <div>{this.props.source}</div>
                    </div>
                </div>
                <div className="list-item">
                    <div className="list-item__section size-30">
                        <div>To:</div>
                    </div>
                    <div className="list-item__section size-70">
                        <Select
                            className="list-item__select-container"
                            classNamePrefix="list-item__select"
                            placeholder="Select destination..."
                            value={this.state.destination}
                            onChange={destination => this.onChange({destination})}
                            options={this.props.accounts}
                            autoFocus
                        />
                    </div>
                </div>
                <div className="list-item">
                    <div className="list-item__section size-30">
                        <div>Amount:</div>
                    </div>
                    <div className="list-item__section size-70">
                        <input type="text"
                               value={this.state.amount}
                               onChange={e => this.onChange({amount: e.target.value})}
                               className="list-item__input"/>
                    </div>
                </div>
                <div className="list-item">
                    <div className="list-item__section size-30">
                        <div>Rate:</div>
                    </div>
                    <div className="list-item__section size-70">
                        <input type="text"
                               value={this.state.rate}
                               onChange={e => this.onChange({rate: e.target.value})}
                               className="list-item__input"/>
                    </div>
                </div>
                <div className="list-item">
                    <div className="list-item__section size-30">
                        <div>In Total:</div>
                    </div>
                    <div className="list-item__section size-70">
                        <input type="text"
                               value={this.state.total}
                               onChange={e => this.onChange({total: e.target.value})}
                               className="list-item__input"/>
                    </div>
                </div>
                <div className="list-item">
                    <div className="list-item__section size-30">
                        <div>Comment:</div>
                    </div>
                    <div className="list-item__section size-70">
                        <input type="text"
                               value={this.state.comment}
                               onChange={e => this.onChange({comment: e.target.value})}
                               className="list-item__input"/>
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
                        <button className="button">Transfer</button>
                    </div>
                    <div className="list-item__section">
                        <button className="button" onClick={this.props.onCancel}>Cancel</button>
                    </div>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state, props) => ({
    accounts: convertToSelectList(state.accounts.filter(account => account.name !== props.source), 'name', 'id')
});

export default connect(mapStateToProps)(TransferModalContent);
