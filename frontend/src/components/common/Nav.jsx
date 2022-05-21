import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { burgerIcon, homeIcon, userIcon } from '../../constance/icons';
import { logoNameSvg, logoSvg } from '../../constance/logo';
import { Sidenav, Slime, SearchField, ThemeToggle } from '../';
import './styles/Nav.css';


const Nav = () => {
    const [sidenav, setSidenav] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation().pathname.split('/')[1];
    const user = useSelector((state) => state.auth.user);
    const { msg } = useSelector((state) => state.profile);
    const { inbox } = useSelector((state) => state.inbox);


    return (
        user ? (
        <nav className="main-nav">
            <div className="container nav-wrapper">
                <div className="h-100 flex align-center">
                    <div className="logo">
                        {logoNameSvg}
                    </div>
                    <div className="logo-sm">
                        {logoSvg}
                    </div>
                </div>
                <SearchField/>
                <div className="nav-right">
                    <ul className="nav-links">
                        <li>
                            <NavLink to={`/`} className={`${inbox.length > 0 ? "notify" : ""}${(location === 'inbox' || location === 'sent') ? " active" : ""}`}>
                                {homeIcon}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/${user.username}`}>
                                {userIcon}
                            </NavLink>
                        </li>
                    </ul>
                    <div className="nav-burger">
                        <div className="btn-icon" onClick={() => {setSidenav(true)}}>
                            {burgerIcon}
                        </div>
                    </div>
                </div>
            </div>
            <Sidenav
                isSidenavOpen={sidenav}
                setIsSidenavOpen={setSidenav}
                logo={logoNameSvg}
            >
                <div className="flex flex-column h-100 space-between">
                    <ul className="nav-burger-links">
                        <li>
                            <NavLink 
                                to={`/`}
                                onClick={() => {setSidenav(false)}}
                                className={`${inbox.length > 0 ? "notify-burger" : ""}${(location === 'inbox' || location === 'sent') ? " active" : ""}`}>
                                    {homeIcon}
                                <span className="ml-1">
                                    Home
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to={`/${user.username}`}
                                onClick={() => {setSidenav(false)}}
                            >
                                {userIcon}
                                <span className="ml-1">
                                    {user.username}
                                </span>
                            </NavLink>
                        </li>
                    </ul>
                    <ThemeToggle />
                </div>
            </Sidenav>
        </nav>
        ) : 
        location === 'login' || 
        location === 'register' || 
        (!user && msg == 'Profile not found') ? (
        <>
        <Slime/>
        <nav className="auth-nav">
            <div className="container h-100 flex">
                <div className="logo">
                    {logoNameSvg}
                </div>
            </div>
        </nav>
        </>
        ) : (
            null
        )

    )
}

export default Nav