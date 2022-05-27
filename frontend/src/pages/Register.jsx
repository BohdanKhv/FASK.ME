import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import { Input } from '../components';
import { arrowRepeatIcon } from '../constance/icons';
import { reservedUsernames } from '../constance/reservedUsernames';
import { logEvent, setUserId } from 'firebase/analytics';
import { analytics } from '../firebase';
import './styles/Auth.css';

const Register = () => {
    const [params, setParams] = useSearchParams();
    const [formData, setFormData] = useState({
        username: params.get('username') || '',
        email: '',
        password: '',
    });

    const { email, username, password } = formData;
    const [ clientErr, setClientErr ] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, msg } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            console.log(msg);
        }

        if (isSuccess || user) {
            logEvent(analytics, 'register', {
                user_id: user._id,
                user_username: user.username
            });
            setUserId(analytics, user._id);

            navigate('/');
        }
    }, [user, isError, isSuccess, msg, navigate, dispatch]);

    useEffect(() => {
        document.title = 'Fask.me | Register';

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

        if (email === '' || password === '' || username === '') {
            setClientErr('All fields are required');
            return;
        } else if (username.length < 3) {
            setClientErr('Username must be at least 3 characters long');
            return;
        } else if (username.length > 30) {
            setClientErr('Username must be less than 30 characters long');
            return;
        } else if (username.split(' ').length > 1) {
            setClientErr('Username cannot contain spaces');
            return;
        } else if (password.length < 6) {
            setClientErr('Password must be at least 6 characters long');
            return;
        } else if (reservedUsernames.includes(username)) {
            setClientErr('Username is reserved');
            return;
        } else {
            const userData = {
                email,
                username,
                password,
            };

            setClientErr('');
            dispatch(register(userData));
        }
    };


    return (
        <main className="auth container">
            <div className="auth-wrapper">
                <div className="auth-container">
                    <div className="form-header">
                        <h1 className="title-1 text-center p-1">
                            Create an account
                        </h1>
                        <p className="title-3 text-secondary text-center pb-1 px-1">
                            Free forever, no ads, no limits.
                        </p>
                    </div>
                    <div className="auth-form">
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <Input
                                    type="text"
                                    name="username"
                                    label="Username *"
                                    value={username}
                                    onChange={onChange}
                                    maxLength={30}
                                    minLength={3}
                                >
                                    fask.me/
                                </Input>
                            </div>
                            <div className="form-group">
                                <Input
                                    type="email"
                                    name="email"
                                    label="Email *"
                                    value={email}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="form-group">
                                <Input
                                    type="password"
                                    name="password"
                                    label="Password *"
                                    value={password}
                                    onChange={onChange}
                                />
                            </div>
                            <button 
                                type="submit" 
                                className={`btn w-100 spinner${username.length > 0 && email.length > 0 && password.length > 0 ? ' btn-primary' : ''}`}
                            >
                                {isLoading ? arrowRepeatIcon : 'Sign up'}
                            </button>
                            {isError ? 
                                <div className="text-danger mt-1 bg-err">{msg}</div>
                            : clientErr ?
                                <div className="text-danger mt-1 bg-err">{clientErr}</div>
                            : null}
                        </form>
                        <p className="mt-1 text-end">
                            Already have an account? <NavLink className="text-hover" to="/login">Log in</NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Register