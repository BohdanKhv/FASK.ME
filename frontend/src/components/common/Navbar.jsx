import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { questionsNav, feedNav } from '../../constance/localData';
import './styles/Navbar.css';


const Navbar = () => {
    const location = useLocation().pathname.toLocaleLowerCase();
    const { profile } = useSelector((state) => state.profile);
    const { numFound } = useSelector((state) => state.inbox);
    const { user } = useSelector((state) => state.auth);
    const [links, setLinks] = useState([]);


    useEffect(() => {
        if(profile && location.includes(profile.username.toLocaleLowerCase())) {
            setLinks(questionsNav(profile.username));
        } else {
            setLinks(feedNav);
        }
    }, [location])

    return (
        <div className="navbar w-100 w-max">
            <div className="navbar-wrapper">
                {links.map((link, index) => (
                    ( link.isPrivate && user && (user._id === profile.user._id) ||
                    !link.isPrivate ) &&
                        <Link
                            key={`navbar-${link.name+index}`}
                            to={`${link.path}`} 
                            className={`navbar-item${location === link.path.toLocaleLowerCase() ? ' active' : ''}${link.notify && numFound > 0 ? ' notify' : ''}`}
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