import React from 'react';
import './Button.css';

export default function Button(props) {
    return (
        <button type="button">{props.title}</button>
    );
};
