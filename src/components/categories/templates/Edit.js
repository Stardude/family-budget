import React from 'react';

const Edit = (props) => (
    <form className="list-item" onSubmit={props.onSubmit} onKeyUp={props.onCancel} >
        <div className="list-item__section size-40">
            {props.error && <div className="list-item__title-error">{props.error}</div>}
            <div>
                <input type="text"
                       name="name"
                       defaultValue={props.name}
                       className="list-item__input"
                       autoFocus/>
            </div>
        </div>
        <div className="list-item__section size-30"></div>
        <div className="list-item__section size-30 align-right">
            <button className="button">Save</button>
            <button className="button" onClick={props.onCancel}>Cancel</button>
        </div>
    </form>
);

export default Edit;
