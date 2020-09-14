import React from 'react';
import './InputGroup.css';

import Button from '../Button/Button';

export default function InputGroup() {
    return (
        <div className="input-group">
            <input type="text" placeholder="New task title" />
            <Button title="ADD" className="primary" />
        </div>
    );
};
