import './styles/Tooltip.css';

const Tooltip = ({children, content}) => {
    return (
        <div className="tooltip">
            <span className="tooltip-text">
                <div class="tooltip-arrow"></div>
                {content}
            </span>
            {children}
        </div>
    )
}

export default Tooltip