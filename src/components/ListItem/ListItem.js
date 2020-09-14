import React from 'react';
import './ListItem.css';

import Button from '../Button/Button';

export default function ListItem(props) {
    return (
        <div className="list-item">
            <div>
                <input type="checkbox" id="fruit3" />
                <label for="fruit3"></label>
            </div>
            
            <h3>{props.title}</h3>
            <Button className="primary">
                <i className="fa fa-edit"></i>
            </Button>
            <Button className="danger">
                <i className="fa fa-trash"></i>
            </Button>
        </div>
    );
};
