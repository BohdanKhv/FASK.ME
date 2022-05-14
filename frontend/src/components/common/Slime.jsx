import { useLocation } from 'react-router-dom';
import './styles/Slime.css';

const Slime = () => {
    const location = useLocation();

    return (
        <div className="slime-wrapper">
            <div 
                className={`slime${location === 'login' ? ' login' : ' register'}`}
            />
        </div>
    )
}

export default Slime