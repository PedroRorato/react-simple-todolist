import React from 'react';
import './List.css';

export default function List(props) {
    return (
        <div className="list">
            {props.children}
        </div>
    );
};
