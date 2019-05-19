import React from 'react';

import ConfigurationModal from './ConfigurationModal';
import ModalWindow from '../general/ModalWindow';

class Configuration extends React.Component {
    state = {
        error: undefined,
        isConfigurationOpen: false
    };

    onSubmit = () => {
        this.setState({ isConfigurationOpen: false, error: undefined });
        window.location.reload();
    };

    onCancel = e => {
        if (e.type === 'click' || e.keyCode === 27) {
            this.setState({ isConfigurationOpen: false, error: undefined });
        }
    };

    onConfigurationOpen = () => {
        this.setState({ isConfigurationOpen: true, error: undefined });
    };

    render() {
        return (
            <div className="list-item__section">
                <button className="button" onClick={this.onConfigurationOpen}>Configuration</button>
                {this.state.isConfigurationOpen &&
                <ModalWindow isOpen={this.state.isConfigurationOpen} onClose={this.onCancel}>
                    <ConfigurationModal onSubmit={this.onSubmit} onCancel={this.onCancel} error={this.state.error} />
                </ModalWindow>}
            </div>
        );
    }
}

export default Configuration;
