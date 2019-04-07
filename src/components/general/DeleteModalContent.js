import React from 'react';

class DeleteModalContent extends React.Component {
    render () {
        return (
            <form onSubmit={this.props.onSubmit} onKeyUp={this.props.onCancel} >
                <div className="list-item">
                    {this.props.children}
                </div>
                <div className="list-item list-item--justify-end">
                    <div className="list-item__section">
                        <button className="button">Delete</button>
                    </div>
                    <div className="list-item__section">
                        <button className="button" onClick={this.props.onCancel}>Cancel</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default DeleteModalContent;
