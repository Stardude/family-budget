import React from 'react';
import { connect } from 'react-redux';

import Category from './Category';
import { startGetAllCategories } from "../../actions/categories";

class CategoryList extends React.Component {
    componentDidMount() {
        this.props.dispatch(startGetAllCategories());
    }

    render() {
        return (
            <div className="list">
                {this.props.categories.map(category =>
                    <Category {...category}
                             key={category.id} />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    categories: state.categories.sort((a, b) => a.name.localeCompare(b.name))
});

export default connect(mapStateToProps)(CategoryList);
