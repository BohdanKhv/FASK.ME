import { useState, useEffect } from 'react';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import { Input } from '../components';
import './styles/Auth.css';
import { arrowRepeatIcon } from '../constance/icons';
import { logEvent, setUserId } from 'firebase/analytics';
import { analytics } from '../firebase';


const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const { username, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, msg } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isSuccess || user) {
            logEvent(analytics, 'login', {
                user_id: user._id,
                user_username: user.username
            });
            setUserId(analytics, user._id);

            navigate(`/${user.username}`);
        }
    }, [user, isSuccess, msg, navigate, dispatch]);

    useEffect(() => {
        document.title = 'Fask.me | Login';

        return () => {
            dispatch(reset());
        }
    }, [])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (username === '' || password === '') {
            return;
        } else {
            const userData = {
                username,
                password
            };

            dispatch(login(userData));
        }
    };


    return (
        <main className="auth container">
            <div className="auth-wrapper">
                <div className="auth-container">
                    <div className="form-header">
                        <h1 className="title-1 text-center p-1">
                            Log in to your account
                        </h1>
                    </div>
                    <div className="auth-form">
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <Input
                                    type="text"
                                    name="username"
                                    label="Username or email"
                                    value={username}
                                    onChange={onChange}
                                    autoCompleteOn={true}
                                />
                            </div>
                            <div className="form-group">
                                <Input
                                    type="password"
                                    name="password"
                                    label="Password"
                                    value={password}
                                    onChange={onChange}
                                />
                            </div>
                            <button type="submit" 
                                className={`btn w-100 mb-3 spinner${username.length > 0 && password.length > 0 ? ' btn-primary' : ' btn-secondary'}`}
                            >
                                {isLoading ? arrowRepeatIcon : 'Log in'}
                            </button>
                            {isError && <div className="text-danger mt-1 bg-err">{msg}</div>}
                        </form>
                        <NavLink to="/forgot-password">
                            Forgot password?
                        </NavLink>
                        <p className="mt-1 text-end">
                            Don't have an account? <NavLink className="text-hover" to="/register">Create One</NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Login