import { Link } from 'react-router-dom';
import { faqIcon, answeredIcon, askedIcon } from '../../constance/icons';
import './styles/Navbar.css';


const Navbar = ({ currentLocation, links }) => {

    return (
        <div className="navbar">
            {links.map((link, index) => (
                <Link 
                    to={`${link.pathname}`} 
                    className={`navbar-item${!currentLocation === link.location ? ' active' : ''}`}
                >
                    { link.icon }
                    { link.name }
                    { link.count ? (
                        <p>{link ? link.count : 0}</p>
                    ) : null}
                </Link>
            ))}
        </div>
    )
}

export default Navbar