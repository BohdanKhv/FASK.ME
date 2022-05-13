import './styles/Tooltip.css';

const Tooltip = ({children, content, classList}) => {
    return (
        <div className={`tooltip ${classList ? classList : ''}`}>
            <span className="tooltip-text">
                <div className="tooltip-arrow"></div>
                {content}
            </span>
            {children}
        </div>
    )
}

export default Tooltip