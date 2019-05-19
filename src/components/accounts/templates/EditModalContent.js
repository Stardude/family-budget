import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';

class EditModalContent extends React.Component {
    state = {
        currency: this.props.currency ? { label: this.props.currency, value: this.props.currency } : this.props.curencies[0]
    };

    onChange = (newState) => {
        this.setState(newState);
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(e, this.state.currency.value);
    };

    render () {
        return (
            <form onSubmit={this.onSubmit} onKeyUp={this.props.onCancel} >
                <div className="list-item">
                    <div className="list-item__section size-30">
                        <div>Name:</div>
                    </div>
                    <div className="list-item__section size-70">
                        {this.props.error && <div className="list-item__title-error">{this.props.error}</div>}
                        <div>
                            <input type="text"
                                   name="name"
                                   defaultValue={this.props.name}
                                   className="list-item__input"
                                   autoFocus/>
                        </div>
                    </div>
                </div>
                <div className="list-item">
                    <div className="list-item__section size-30">
                        <div>Currency:</div>
                    </div>
                    <div className="list-item__section size-70">
                        <Select
                            className="list-item__select-container"
                            classNamePrefix="list-item__select"
                            placeholder="Select currency..."
                            value={this.state.currency}
                            onChange={currency => this.onChange({currency})}
                            options={this.props.curencies}
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

const mapStateToProps = state => ({
    curencies: [
        { label: 'грн', value: 'грн' },
        { label: 'USD', value: 'USD' },
        { label: 'EUR', value: 'EUR' },
        { label: 'PLN', value: 'PLN' }
    ]
});

export default connect(mapStateToProps)(EditModalContent);
