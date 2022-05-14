import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { burgerIcon, doorClosedIcon, homeIcon, searchIcon, sentIcon, userIcon } from '../../constance/icons';
import { logout } from '../../features/auth/authSlice';
import { logoNameSvg, logoSvg } from '../../constance/logo';
import { Input, Sidenav, Slime } from '../';
import './styles/Nav.css';


const Nav = () => {
    const [sidenav, setSidenav] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation().pathname.split('/')[1];
    const user = useSelector((state) => state.auth.user);
    const { msg } = useSelector((state) => state.profile);
    const inbox = useSelector((state) => state.question.inbox);

    return (
        user ? (
        <nav className="main-nav">
            <div className="container nav-wrapper">
                <div className="h-100 flex align-center">
                    <div className="logo">
                        {logoNameSvg}
                    </div>
                </div>
                <Input
                    type="text"
                    name="search"
                    placeholder="Search"
                    label="Search"
                    // value={''}
                    icon={searchIcon}
                    bodyStyle={{
                        width: '600px',
                        margin: '0 1.5rem',
                    }}
                />
                <div className="nav-right">
                    <ul className="nav-links">
                        <li>
                            <NavLink to={`/`} className={`${inbox?.length > 0 ? "notify" : ""}${(location === 'inbox' || location === 'sent') ? " active" : ""}`}>
                                {homeIcon}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/${user.username}`}>
                                {userIcon}
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="nav-burger h-100">
                <div className="flex align-between h-100 px-1">
                    <div className="h-100 flex align-center">
                        <div className="logo">
                            {logoSvg}
                        </div>
                    </div>
                    <Input
                        type="text"
                        name="search"
                        placeholder="Search"
                        label="Search"
                        // value={''}
                        icon={searchIcon}
                        bodyStyle={{
                            width: '600px',
                            margin: '0 1.5rem',
                        }}
                    />
                    <div className="btn btn-outline" onClick={() => {setSidenav(true)}}>
                        {burgerIcon}
                    </div>
                </div>
                <Sidenav
                    isSidenavOpen={sidenav}
                    setIsSidenavOpen={setSidenav}
                    logo={logoNameSvg}
                >
                <ul className="nav-burger-links">
                        <li>
                            <NavLink 
                                to={`/`}
                                onClick={() => {setSidenav(false)}}
                                className={`${inbox?.length > 0 ? "notify-burger" : ""}${(location === 'inbox' || location === 'sent') ? " active" : ""}`}>
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
                </Sidenav>
            </div>
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