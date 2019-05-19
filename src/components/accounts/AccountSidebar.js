import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class AccountSidebar extends React.Component {
    state = {
        accountIds: [],
        rates: {}
    };

    componentWillMount() {
        this.getConfiguration();
    }

    getConfiguration = () => {
        axios.get('/api/configuration').then(response => {
            this.setState({
                accountIds: response.data.accountIdsToIncludeIntoTotalBalance,
                rates: this.translateRates(response.data.rate.rates)
            });
        });
    };

    translateRates = rates => {
        return {
            грн: 1,
            USD: (rates.UAH / rates.USD).toPrecision(4),
            EUR: rates.UAH.toPrecision(4),
            PLN: (rates.UAH / rates.PLN).toPrecision(3)
        }
    };

    getTotalBalance = currency => {
        if (currency) {
            return this.props.accounts.reduce((sum, account) => {
                return (this.state.accountIds.includes(account.id) && currency === account.currency) ?
                    sum + parseFloat(account.balance) :
                    sum;
            }, 0);
        } else {
            return this.props.accounts.reduce((sum, account) => {
                return (this.state.accountIds.includes(account.id)) ?
                    sum + (parseFloat(account.balance) * this.state.rates[account.currency]) :
                    sum;
            }, 0).toPrecision(8);
        }
    };

    render() {
        return (
            <div className="list">
                <div className="list-item list-item--no-border">
                    <div className="list-item__section">
                        <span>{this.getTotalBalance('грн')} грн</span>
                    </div>
                </div>
                <div className="list-item list-item--no-border">
                    <div className="list-item__section">
                        <span>{this.getTotalBalance('USD')} USD</span>
                    </div>
                    <div className="list-item__section list-item__section--align-end">
                        <span>(1 USD = {this.state.rates.USD} грн)</span>
                    </div>
                </div>
                <div className="list-item list-item--no-border">
                    <div className="list-item__section">
                        <span>{this.getTotalBalance('EUR')} EUR</span>
                    </div>
                    <div className="list-item__section list-item__section--align-end">
                        <span>(1 EUR = {this.state.rates.EUR} грн)</span>
                    </div>
                </div>
                <div className="list-item">
                    <div className="list-item__section">
                        <span>{this.getTotalBalance('PLN')} PLN</span>
                    </div>
                    <div className="list-item__section list-item__section--align-end">
                        <span>(1 PLN = {this.state.rates.PLN} грн)</span>
                    </div>
                </div>
                <div className="list-item list-item--no-border list-item--justify-end">
                    <div className="list-item__section">
                        <span>Total balance:</span>
                    </div>
                    <div className="list-item__section list-item__section--align-end">
                        <span>{this.getTotalBalance()} грн</span>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    accounts: state.accounts
});

export default connect(mapStateToProps)(AccountSidebar);
