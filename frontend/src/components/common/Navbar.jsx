import { Link, useLocation } from 'react-router-dom';
import { faqIcon, answeredIcon, askedIcon } from '../../constance/icons';
import './styles/Navbar.css';


const Navbar = ({ links }) => {
    const location = useLocation().pathname;

    return (
        <div className="navbar">
            <div className="navbar-wrapper">
                {links.map((link, index) => (
                    <Link
                        key={`navbar-${link.name+index}`}
                        to={`${link.path}`} 
                        className={`navbar-item${location === link.path ? ' active' : ''}${link.notify ? ' notify' : ''}`}
                    >
                        { link.icon }
                            <div className="flex flex-column align-center">
                            <p className="navbar-name">
                                { link.name }
                            </p>
                            { link.count !== null ? (
                                <p className="text-secondary">{link.count}</p>
                            ) : null}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Navbar