import { useEffect, useRef, useState } from 'react';
import './styles/Tooltip.css';

const Tooltip = ({children, content, classList}) => {
    const [isOpen, setIsOpen] = useState(false);
    const tooltipRef = useRef();
    const contentRef = useRef();

    useEffect(() => {
        // if the tooltip is open make sure content is visible on the screen and not off screen
        if (isOpen) {
            const content = contentRef.current;
            const contentRect = content.getBoundingClientRect();
            const tooltipRect = tooltipRef.current.getBoundingClientRect();
            
            // if the content is off screen to the left or right, move it to the left or right
            if (contentRect.left < 0) {
                content.style.transform = `translateX(${tooltipRect.left * 2.5 }px)`;
            } else if (contentRect.right > window.innerWidth) {
                content.style.transform = `translateX(${(window.innerWidth - tooltipRect.right) * -2.5 }px)`;
            }
        } else {
            contentRef.current.style.transform = 'translateX(0px)';
        }
    }, [isOpen]);

    return (
        <div 
            className={`tooltip ${classList ? classList : ''}`}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            ref={tooltipRef}
        >
            <span 
                className="tooltip-text"
                ref={contentRef}
            >
                {/* <div className="tooltip-arrow"></div> */}
                {content}
            </span>
            {children}
        </div>
    )
}

export default Tooltip