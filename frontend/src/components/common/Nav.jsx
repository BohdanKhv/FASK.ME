import { useState } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addUserIcon, burgerIcon, doorOpenIcon, homeIcon, userIcon, walletIcon } from '../../constance/icons';
import { logoNameSvg, logoSvg } from '../../constance/logo';
import { Sidenav, Slime, SearchField, ThemeToggle, Wallet } from '../';
import { homePathNames } from '../../constance/localData';
import './styles/Nav.css';


const Nav = () => {
    const [sidenav, setSidenav] = useState(false);
    const [walletIsOpen, setWalletIsOpen] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation().pathname.split('/')[1];
    const user = useSelector((state) => state.auth.user);
    const { msg } = useSelector((state) => state.profile);
    const { numFound } = useSelector((state) => state.inbox);


    return (
        user || (!user && location === '') ? (
        <>
        <nav className="main-nav">
            <div className="container nav-wrapper">
                <Link to="/" className="h-100 flex align-center">
                    <div className="logo-sm">
                        {logoNameSvg}
                    </div>
                    <div className="logo-sm min">
                        {logoSvg}
                    </div>
                </Link>
                <SearchField/>
                <div className="nav-right">
                    <ul className="nav-links">
                        { user ? (
                        <>
                            <li>
                                <NavLink to={`/`} className={`${numFound > 0 ? "notify" : ""}${(location === 'inbox' || location === 'sent') ? " active" : ""}`}>
                                    {homeIcon}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={`/${user.username}`}>
                                    {userIcon}
                                </NavLink>
                            </li>
                            <li>
                                <a
                                    onClick={() => {setWalletIsOpen(true)}}
                                >
                                    {walletIcon}
                                </a>
                            </li>
                        </>
                        ) : !user && location === ''  && (
                        <>
                            <li>
                                <NavLink to={`/login`} className="opacity-1 btn">
                                    Log in
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={`/register`} className="opacity-1 btn btn-primary ml-1">
                                    Sign up
                                </NavLink>
                            </li>
                        </>
                        )}
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
                        { user ? (
                        <>
                            <li>
                                <NavLink 
                                    to={`/`}
                                    onClick={() => {setSidenav(false)}}
                                    className={`${numFound > 0 ? "notify-burger" : ""}${(location === 'inbox' || location === 'sent') ? " active" : ""}`}>
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
                            <li>
                                <a
                                    onClick={() => {setWalletIsOpen(true)}}
                                >
                                    {walletIcon}
                                    <span className="ml-1">
                                        {user.profile.wallet ? `${user.profile.wallet.slice(0,5)}...${user.profile.wallet.slice(-4, 0)}` : 'Connect Wallet'}
                                    </span>
                                </a>
                            </li>
                        </>
                        ) : !user && location === ''  && (
                        <>
                            <li>
                                <NavLink className="opacity-1"
                                    to={`/login`}
                                    onClick={() => {setSidenav(false)}}>
                                    {doorOpenIcon}
                                    <span className="ml-1 opacity-1">
                                        Login
                                    </span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="opacity-1"
                                    to={`/register`}
                                    onClick={() => {setSidenav(false)}}>
                                    {addUserIcon}
                                    <span className="ml-1 opacity-1">
                                        Sign up
                                    </span>
                                </NavLink>
                            </li>
                        </>
                        )}
                    </ul>
                    <ThemeToggle />
                </div>
            </Sidenav>
        </nav>
        {user && (
            <Wallet
                walletIsOpen={walletIsOpen}
                setWalletIsOpen={setWalletIsOpen}
            />
        )}
        </>
        ) : 
        homePathNames.includes(location) || 
        (!user && msg == 'Profile not found') ? (
        <>
            <Slime/>
            <nav className="auth-nav">
                <div className="container h-100 flex">
                    <Link to="/" className="logo-lg">
                        {logoNameSvg}
                    </Link>
                </div>
            </nav>
        </>
        ) : (
            null
        )
    )
}

export default Nav