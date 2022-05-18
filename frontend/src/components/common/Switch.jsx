import './styles/Switch.css';

const Switch = ({value, onChange, isDisabled}) => {
    return (
        <div className="switch">
            <label>
                <input
                    type="checkbox"
                    checked={value}
                    onChange={onChange}
                    isdisabled={isDisabled}
                />
                <span className="slider round"></span>
            </label>
        </div>
    )
}

export default Switch