import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import './styles/Auth.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const { email, username, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, msg } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            console.log(msg);
        }

        if (isSuccess || user) {
            navigate('/');
        }

        dispatch(reset());
    }, [user, isError, isSuccess, msg, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (email === '' || password === '' || username === '') {
            return;
        } else {
            const userData = {
                email,
                username,
                password,
            };

            dispatch(register(userData));
        }
    };


    return (
        <main className="auth">
            <div className="auth-wrapper">
                <div className="auth-container">
                    <div className="form-header">
                        <h1 className="title-1 text-center py-1">
                            logo placeholder
                        </h1>
                        <p className="title-3 text-secondary text-center pb-1">
                            Sign up to get started
                        </p>
                    </div>
                    <div className="auth-form">
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <label>Username *</label>
                                <div className="flex username-field">
                                    <div className="hoast">
                                        anask.com/
                                    </div>
                                    <input
                                        type="text"
                                        name="username"
                                        className="w-100"
                                        placeholder="your username"
                                        value={username}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={onChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Password *</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={onChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn w-100">
                                Sign up
                            </button>
                        </form>
                        <p className="mt-1 text-end">
                            Already have an account? <NavLink className="text-hover" to="/login">Log In</NavLink>
                        </p>
                    </div>
                </div>
            </div>
            <div className="left-window"></div>
        </main>
    )
}

export default Register