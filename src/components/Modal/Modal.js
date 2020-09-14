import React from 'react';
import './Modal.css';

import Card from '../Card/Card';

export default function Modal(props) {
    return (
        <div className="modal-container">
            <Card>
                <div className="modal-header">
                    <h2>Título do Card</h2>
                    <i className="fa fa-times" onClick={props.closeModal}></i>
                </div>
                <hr/>
                <hr/>
            </Card>
        </div>
    );
};
