import './styles/Tooltip.css';

const Tooltip = ({children, content}) => {
    return (
        <div className="tooltip">
            <span className="tooltip-text">
                <div className="tooltip-arrow"></div>
                {content}
            </span>
            {children}
        </div>
    )
}

export default Tooltip