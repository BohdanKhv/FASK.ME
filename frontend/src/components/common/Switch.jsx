import './styles/Switch.css';

const Switch = ({onChange, isDisabled}) => {
    return (
        <div className="switch">
            <label>
                <input type="checkbox" onChange={onChange} isdisabled={isDisabled}/>
                <span className="slider round"></span>
            </label>
        </div>
    )
}

export default Switch