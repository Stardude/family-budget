import React from 'react';

const Checkbox = props => (
    <div className="checkbox-container">
        <input type="checkbox" className="checkbox" id={props.name} name={props.name} defaultChecked={props.defaultChecked} />
        <label htmlFor={props.name}></label>
    </div>
);

export default Checkbox;
