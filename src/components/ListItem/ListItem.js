import React from 'react';
import './ListItem.css';

import Button from '../Button/Button';

export default function ListItem(props) {
    return (
        <div className="list-item">
            <div>
                <input type="checkbox" id={props.id} />
                <label htmlFor={props.id}></label>
            </div>
            
            <h3>{props.title}</h3>
            <Button className="primary" onClick={props.onClickUpdate} >
                <i className="fa fa-edit"></i>
            </Button>
            <Button className="danger" onClick={props.onClickDelete} >
                <i className="fa fa-trash"></i>
            </Button>
        </div>
    );
};
