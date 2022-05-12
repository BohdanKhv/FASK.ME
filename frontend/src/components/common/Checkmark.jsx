import './styles/Checkmark.css';

const Checkmark = ({value, icon, onChange, classList}) => {

    return (
        <div 
            className={`checkmark${classList ? ` ${classList}` : ''}${value ? ' checked' : ''}`}
            onClick={() => onChange(!value)}
        >
            {icon}
        </div>
    )
}

export default Checkmark