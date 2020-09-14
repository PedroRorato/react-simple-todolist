import React from 'react';
import './InputGroup.css';

import Button from '../Button/Button';

export default function InputGroup(props) {
    return (
        <div className="input-group">
            <input id="input-task" type="text" placeholder="New task..." />
            <Button title="ADD" className="primary" onClick={props.onClick} />
        </div>
    );
};
