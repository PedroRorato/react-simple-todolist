import React from 'react';
import './Alert.css';

export default function Alert(props) {
    const classNames = "alert " + props.className;

    return (
        <div className={classNames}>
            {props.children}
        </div>
    );
};