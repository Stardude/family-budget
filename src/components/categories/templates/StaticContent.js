import React from 'react';
import { connect } from 'react-redux';

import ModalWindow from '../../general/ModalWindow';
import DeleteModalContent from '../../general/DeleteModalContent';

import { startDeleteCategory } from '../../../actions/categories';

class StaticContent extends React.Component {
    state = {
        deleteId: null
    };

    onSubmit = e => {
        this.props.deleteCategory(this.state.deleteId);
        this.setState({ deleteId: null });
    };

    onCancel = e => {
        if (e.type === 'click' || e.keyCode === 27) {
            this.setState({ deleteId: null });
        }
    };

    render () {
        return (
            <div className="list-item">
                <div className="list-item__section size-40">
                    <span>{this.props.name}</span>
                </div>
                <div className="list-item__section size-30"></div>
                <div className="list-item__section size-30 align-right">
                    <button className="button" onClick={this.props.onEdit}>Edit</button>
                    <button className="button" onClick={e => this.setState({ deleteId: this.props.id })}>Remove</button>
                </div>
                {this.state.deleteId &&
                <ModalWindow isOpen={!!this.state.deleteId} onClose={this.onCancel}>
                    <DeleteModalContent onSubmit={this.onSubmit} onCancel={this.onCancel} >
                        <p>Are you sure you want to delete category<br/>'{this.props.name}' ?</p>
                    </DeleteModalContent>
                </ModalWindow>}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    deleteCategory: id => dispatch(startDeleteCategory(id))
});

export default connect(null, mapDispatchToProps)(StaticContent);
