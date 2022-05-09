import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import { Input } from '../components';
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
                            Create an account for free
                        </h1>
                        <p className="title-3 text-secondary text-center pb-1">
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
                                >
                                    anask.com/
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
                                className={`btn w-100${username.length > 0 && email.length > 0 && password.length > 0 ? ' btn-primary' : ''}`}
                            >
                                Sign up
                            </button>
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