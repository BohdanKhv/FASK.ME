import { useState, useEffect } from 'react';
import { closeIcon } from '../../constance/icons';
import './styles/Sidenav.css';

const Sidenav = ({children, title, isSidenavOpen, setIsSidenavOpen, logo}) => {
    const [isOpen, setIsOpen] = useState(false);

    const onClickOutside = (e) => {
        if (e.target.classList.contains('sidenav-wrapper')) {
            setIsSidenavOpen(false);
        }
    }

    useEffect(() => {
        if (!isSidenavOpen) {
            setTimeout(() => {
                setIsOpen(false);
            }, 300);
        } else {
            setIsOpen(true);
        }
    }, [isSidenavOpen]);

    return (
        isOpen ? (
        <div 
            className={`sidenav-wrapper ${isSidenavOpen ? 'open' : 'closed'}`}
            onClick={onClickOutside}
        >
            <div className="sidenav">
                <div className="sidenav-header">
                    <div className="flex align-between">
                        <h3 className="title-3">
                            {logo && (<span className="sidenav-logo">{logo}</span>)}{title}
                        </h3>
                        <div className="btn-icon btn-icon-danger" onClick={() => {setIsSidenavOpen(false)} }>
                            {closeIcon}
                        </div>
                    </div>
                </div>
                <div className="sidenav-body">
                    {children}
                </div>
            </div>
        </div>
        ) : null
    )
}

export default Sidenav