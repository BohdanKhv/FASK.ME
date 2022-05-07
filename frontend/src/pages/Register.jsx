import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import './styles/Auth.css';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password1: '',
        password2: ''
    });

    const { email, firstName, lastName, password1, password2 } = formData;

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

        if (email === '' || password1 === '' || password2 === '' || firstName === '' || lastName === '') {
            return;
        } else if (password1 !== password2) {
            return;
        } else {
            const userData = {
                email,
                firstName,
                lastName,
                password: password1
            };

            dispatch(register(userData));
        }
    };


    return (
        <main className="auth">
            <div className="auth-wrapper">
                <div className="auth-container">
                    <div className="form-header">
                        <h1 className="title-1 text-center py-1">Register</h1>
                    </div>
                    <div className="auth-form">
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={onChange}
                                    required
                                />
                            </div>
                            <div className="form-group-row">
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name *</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        placeholder="Enter your first name"
                                        value={firstName}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name *</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        placeholder="Enter your last name"
                                        value={lastName}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password1">Password *</label>
                                <input
                                    type="password"
                                    name="password1"
                                    id="password1"
                                    placeholder="Enter your password"
                                    value={password1}
                                    onChange={onChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password2">Confirm Password *</label>
                                <input
                                    type="password"
                                    name="password2"
                                    id="password2"
                                    placeholder="Confirm your Password"
                                    value={password2}
                                    onChange={onChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn w-100">
                                Register
                            </button>
                        </form>
                        <p className="mt-1 text-end">
                            Already have an account? <NavLink className="text-hover" to="/login">Login</NavLink>
                        </p>
                    </div>
                </div>
            </div>
            <div className="left-window"></div>
        </main>
    )
}

export default Register