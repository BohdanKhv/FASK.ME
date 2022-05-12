import { useState, useEffect, useRef } from 'react';
import './styles/Textarea.css';

const Textarea = ({children, icon, type, name, label, value, onChange, bodyStyle, inputStyle, labelStyle, minLength, maxLength, cols, rows}) => {
    const [isFocused, setIsFocused] = useState(false);
    const textareaRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.name !== name) {
                setIsFocused(false);
            }
        }
        
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [name]);
    
    return (
        <div
            className={`textarea${isFocused ? ' focused' : ''}`}
            onClick={() => {
                setIsFocused(true);
                textareaRef.current.focus();
            }}
            style={bodyStyle}
        >
            {children && (
                <div className={`textarea-pre${isFocused || value || ( textareaRef.current && textareaRef.current.value.length !== 0 ) ? ' focused' : ''}`}>
                    <p>
                        {children}
                    </p>
                </div>
            )}
            <textarea
                style={inputStyle}
                ref={textareaRef}
                className={`${isFocused || value || ( textareaRef.current && textareaRef.current.value.length !== 0 ) ? 'focused' : ''}`}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={label}
                minLength={minLength}
                maxLength={maxLength}
                cols={cols}
                rows={rows}
            />
            <div
                style={labelStyle}
                className={`textarea-label${isFocused || value || ( textareaRef.current && textareaRef.current.value.length !== 0 ) ? ' focused' : ''}`}
            >
                {icon}
                {label}
            </div>
        </div>
    )
}

export default Textarea