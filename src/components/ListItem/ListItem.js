import React from 'react';
import './ListItem.css';

import Button from '../Button/Button';

export default function ListItem(props) {
    return (
        <div className="list-item">
            <input type="checkbox" />
            <h3>Tarefa</h3>
            <Button className="primary">
                <i class="fa fa-edit"></i>
            </Button>
            <Button className="danger">
                <i class="fa fa-trash"></i>
            </Button>
        </div>
    );
};
