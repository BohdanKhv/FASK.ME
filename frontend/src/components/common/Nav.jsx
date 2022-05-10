import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { doorClosedIcon, homeIcon, searchIcon, sentIcon, userIcon } from '../../constance/icons';
import { logout } from '../../features/auth/authSlice';
import { Input } from '../';
import './styles/Nav.css';


const Nav = () => {
    const dispatch = useDispatch();
    const location = useLocation().pathname.split('/')[1];
    const user = useSelector((state) => state.auth.user);

    return (
        user ? (
        <nav className="main-nav">
            <div className="container nav-wrapper">
                    <div className="h-100 flex align-center">
                        <div className="big-logo title-3">
                            FASK.ME
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
                            <NavLink to={`/`}>
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
        </nav>
        ) : location === 'login' || location === 'register' ? (
        <nav className="auth-nav">
            <div className="container h-100 flex">
                <div className="big-logo">
                    FASK.ME
                </div>
            </div>
            <div 
                className={`left-window${location === 'login' ? ' login' : ' register'}`}
            />
        </nav>
        ) : (
            null
        )

    )
}

export default Nav