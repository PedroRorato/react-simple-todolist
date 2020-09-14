import React from 'react';
import './Button.css';

export default function Button(props) {
    return (
        <button type="button" onClick={props.onClick} className={props.className}>
            {props.children}{props.title}
        </button>
    );
};
