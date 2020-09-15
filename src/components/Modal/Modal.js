import React from 'react';
import './Modal.css';

import Card from '../Card/Card';

export default function Modal(props) {
    const classNames = "modal-container " + props.status;

    return (
        <div className={classNames}>
            <Card>
                <div className="modal-header">
                    <h2>{props.title}</h2>
                    <i className="fa fa-times" onClick={props.closeModal}></i>
                </div>
                {props.children}
            </Card>
        </div>
    );
};
