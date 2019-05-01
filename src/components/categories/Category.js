import React from 'react';

import Static from "./templates/StaticContent";

class Category extends React.Component {
    render() {
        return (
            <Static {...this.props} />
        );
    }
}

export default Category;
