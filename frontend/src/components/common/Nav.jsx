import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { doorClosedIcon, searchIcon, userIcon } from '../../constance/icons';
import { logout } from '../../features/auth/authSlice';
import './styles/Nav.css';


const Nav = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    return (
        <nav>
            <div className="container nav-wrapper">
                <div className="nav-left">
                    <ul className="nav-links">
                        <li>
                            <NavLink to="/search">
                                logo placeholder
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/search">
                                {searchIcon}
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="nav-right">
                    <ul className="nav-links">
                        {user ? (
                            <>
                                <li>
                                    <NavLink to={`/${user.username}`}>
                                        {userIcon}
                                    </NavLink>
                                </li>
                                <li>
                                    <a onClick={() => {dispatch(logout())}}>
                                        {doorClosedIcon}
                                    </a>
                                </li>
                            </>
                        ) : (
                        <>
                            <li>
                                <NavLink to="/login">
                                    Login
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/register">
                                    Register
                                </NavLink>
                            </li>
                        </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Nav