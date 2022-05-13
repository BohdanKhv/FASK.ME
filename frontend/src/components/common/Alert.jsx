import { useState, useEffect } from 'react';
import './styles/Alert.css';

const Alert = ({status, message, classList, bodyStyle}) => {
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        setIsOpen(true);
        const timer = setTimeout(() => {
            setIsOpen(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [message]);

    return (
        message && isOpen && (
            <div 
                className={`alert alert-${status}${classList ? ` ${classList}` : ''}`}
                style={bodyStyle}
            >
                {message}
            </div>
        )
    )
}

export default Alert