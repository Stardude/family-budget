import React from 'react';
import { connect } from "react-redux";

import Static from "./templates/Static";
import Edit from "./templates/Edit";

import { startEditCategory, startGetCategoryByName } from "../../actions/categories";
import { checkIfValuesExist } from "../../utils/utils";

class Category extends React.Component {
    state = {
        error: undefined,
        isEditCategory: false
    };

    onSubmit = e => {
        e.preventDefault();
        const name = e.target.name.value.trim();
        let error = undefined;

        if (checkIfValuesExist(name)) {
            this.props.getCategoryByName(name)
                .then(category => {
                    if (category && category.id !== this.props.id) {
                        error = 'Category already exists';
                        this.setState({ error, isEditCategory: true });
                    } else {
                        this.props.editCategory(this.props.id, {name}).then(() => {
                            this.setState({ error, isEditCategory: false });
                        });
                    }
                });

        } else {
            error = 'Invalid category name';
            this.setState({ error, isEditCategory: true });
        }
    };

    onCancel = e => {
        if (e.type === 'click' || e.keyCode === 27) {
            this.setState({ isEditCategory: false, error: undefined });
        }
    };

    onEdit = () => {
        this.setState({ isEditCategory: true, error: undefined });
    };

    render() {
        if (this.state.isEditCategory) {
            return (
                <Edit {...this.props} error={this.state.error} onSubmit={this.onSubmit} onCancel={this.onCancel} />
            );
        } else {
            return (
                <Static {...this.props} onEdit={this.onEdit} />
            );
        }
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCategoryByName: name => dispatch(startGetCategoryByName(name)),
    editCategory: (id, updates) => dispatch(startEditCategory(id, updates))
});

export default connect(null, mapDispatchToProps)(Category);
