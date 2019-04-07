import React from 'react';
import { connect } from "react-redux";

import EditModalContent from "./templates/EditModalContent";
import ModalWindow from "../general/ModalWindow";

import { startAddCategory, startGetCategoryByName } from "../../actions/categories";
import { checkIfValuesExist } from "../../utils/utils";

class NewCategory extends React.Component {
    state = {
        error: undefined,
        isAddNewListItem: false
    };

    onSubmit = e => {
        e.preventDefault();
        const name = e.target.name.value.trim();
        let error = undefined;

        if (checkIfValuesExist(name)) {
            this.props.getCategoryByName(name)
                .then(category => {
                    if (category) {
                        error = 'Category already exists';
                        this.setState({ error, isAddNewListItem: true });
                    } else {
                        this.props.addCategory(name)
                            .then(() => this.setState({ error, isAddNewListItem: false }));
                    }
                });
        } else {
            error = 'Invalid category name';
            this.setState({ error, isAddNewListItem: true })
        }
    };

    onCancel = e => {
        if (e.type === 'click' || e.keyCode === 27) {
            this.setState({ isAddNewListItem: false, error: undefined });
        }
    };

    onAddNewListItem = () => {
        this.setState({ isAddNewListItem: true })
    };

    render() {
        return (
            <div className="list-item__section">
                <button className="button" onClick={this.onAddNewListItem}>Add New Category</button>
                {this.state.isAddNewListItem &&
                <ModalWindow isOpen={this.state.isAddNewListItem} onClose={this.onCancel}>
                    <EditModalContent onSubmit={this.onSubmit} onCancel={this.onCancel} error={this.state.error} />
                </ModalWindow>}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCategoryByName: name => dispatch(startGetCategoryByName(name)),
    addCategory: name => dispatch(startAddCategory(name))
});

export default connect(null, mapDispatchToProps)(NewCategory);
