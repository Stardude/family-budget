import React from 'react';

const Checkbox = props => (
    <div className="checkbox-container">
        <input type="checkbox" className="checkbox" id="checkbox" name={props.name} defaultChecked={props.defaultChecked} />
        <label htmlFor="checkbox"></label>
    </div>
);

export default Checkbox;
