import React from 'react';

const Modal = (props) => (
    <form onSubmit={props.onSubmit} onKeyUp={props.onCancel} >
        <div className="list-item">
            <div className="list-item__section size-30">
                <div>Name:</div>
            </div>
            <div className="list-item__section size-70">
                {props.error && <div className="list-item__title-error">{props.error}</div>}
                <div>
                    <input type="text"
                           name="name"
                           defaultValue={props.name}
                           className="list-item__input"
                           autoFocus/>
                </div>
            </div>
        </div>
        <div className="list-item list-item--justify-end">
            <div className="list-item__section">
                <button className="button">Save</button>
            </div>
            <div className="list-item__section">
                <button className="button" onClick={props.onCancel}>Cancel</button>
            </div>
        </div>
    </form>
);

export default Modal;
