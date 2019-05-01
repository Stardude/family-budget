import React from 'react';
import { connect } from 'react-redux';

import ModalWindow from '../../general/ModalWindow';
import DeleteModalContent from '../../general/DeleteModalContent';
import EditModalContent from "./EditModalContent";

import { startDeleteCategory, startEditCategory, startGetCategoryByName } from '../../../actions/categories';
import { checkIfValuesExist } from "../../../utils/utils";

class StaticContent extends React.Component {
    state = {
        isDeleteItem: false,
        isEditItem: false,
        error: undefined
    };

    onDeleteSubmit = e => {
        this.props.deleteCategory(this.props.id);
        this.setState({ isDeleteItem: false });
    };

    onEditSubmit = e => {
        e.preventDefault();
        const name = e.target.name.value.trim();
        let error = undefined;

        if (checkIfValuesExist(name)) {
            this.props.getCategoryByName(name)
                .then(category => {
                    if (category && category.id !== this.props.id) {
                        error = 'Category already exists';
                        this.setState({ error, isEditItem: true });
                    } else {
                        this.props.editCategory(this.props.id, {name}).then(() => {
                            this.setState({ error, isEditItem: false });
                        });
                    }
                });

        } else {
            error = 'Invalid category name';
            this.setState({ error, isEditItem: true });
        }
    };

    onCancel = e => {
        if (e.type === 'click' || e.keyCode === 27) {
            this.setState({ isDeleteItem: false, isEditItem: false, error: undefined });
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
                    <button className="button" onClick={e => this.setState({ isEditItem: true, error: undefined })}>Edit</button>
                    <button className="button" onClick={e => this.setState({ isDeleteItem: true })}>Remove</button>
                </div>
                {
                    this.state.isDeleteItem &&
                    <ModalWindow isOpen={this.state.isDeleteItem} onClose={this.onCancel}>
                        <DeleteModalContent onSubmit={this.onDeleteSubmit} onCancel={this.onCancel} >
                            <p>Are you sure you want to delete category<br/>'{this.props.name}' ?</p>
                        </DeleteModalContent>
                    </ModalWindow>
                }
                {
                    this.state.isEditItem &&
                    <ModalWindow isOpen={this.state.isEditItem} onClose={this.onCancel}>
                        <EditModalContent {...this.props} onSubmit={this.onEditSubmit} onCancel={this.onCancel} error={this.state.error} />
                    </ModalWindow>
                }
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    deleteCategory: (id) => dispatch(startDeleteCategory(id)),
    getCategoryByName: (name) => dispatch(startGetCategoryByName(name)),
    editCategory: (id, updates) => dispatch(startEditCategory(id, updates))
});

export default connect(null, mapDispatchToProps)(StaticContent);
