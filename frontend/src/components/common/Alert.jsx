import { useState, useEffect } from 'react';
import './styles/Alert.css';

const Alert = ({status, message, setMessage}) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage('');
        }, 3000);

        return () => clearTimeout(timer);
    }, [message]);

    return (
        message && message.length > 0 && (
            <div className={`alert alert-${status}`}>
                {message}
            </div>
        )
    )
}

export default Alert