import React from 'react';

import Static from './templates/StaticContent';

class Record extends React.Component {
    render() {
        return (
            <Static {...this.props} />
        );
    }
}

export default Record;
