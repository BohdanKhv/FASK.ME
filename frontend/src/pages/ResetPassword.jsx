import { useState, useEffect } from 'react';
import { useNavigate, NavLink, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, reset } from '../features/auth/authSlice';
import { Input } from '../components';
import './styles/Auth.css';

const ResetPassword = () => {
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [params, setParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, msg } = useSelector((state) => state.auth);

    useEffect(() => {
        if (msg === "Password updated") {
            navigate(`/login`);
        } else if (user) {
            navigate(`/${user.username}`);
        }
    }, [user, isSuccess, msg, navigate, dispatch]);

    useEffect(() => {
        document.title = 'Fask.me | Reset Password';

        return () => {
            dispatch(reset());
        }
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();
        if (password1 === '' || password2 === '') {
            setErrMsg('Please enter a password');
            return;
        } else if (password1 !== password2) {
            setErrMsg('Passwords do not match');
            return;
        } else {
            const userData = {
                password: password1,
                token: params.get('token'),
                id: params.get('id')
            };
            dispatch(resetPassword(userData));
            setErrMsg('');
        }
    };


    return (
        <main className="auth container">
            <div className="auth-wrapper">
                <div className="auth-container">
                    <div className="form-header">
                        <h1 className="title-1 text-center py-1">
                            Reset Password
                        </h1>
                    </div>
                    <div className="auth-form">
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <Input
                                    type="password"
                                    name="password1"
                                    placeholder="Password"
                                    label="Password"
                                    value={password1}
                                    onChange={(e) => {setPassword1(e.target.value); setErrMsg('')}}
                                />
                            </div>
                            <div className="form-group">
                                <Input
                                    type="password"
                                    name="password2"
                                    label="Confirm Password"
                                    placeholder="Confirm Password"
                                    value={password2}
                                    onChange={(e) => {setPassword2(e.target.value); setErrMsg('')}}
                                />
                            </div>
                            <button type="submit" 
                                className={`btn w-100 ${password1.length > 0 && password1 === password2 ? 'btn-primary' : 'btn-secondary'}`}
                            >
                                Reset Password
                            </button>
                            {errMsg && <div className="text-danger mt-1 bg-err">{errMsg}</div>}
                            {isError && <div className="text-danger mt-1 bg-err">{msg}</div>}
                        </form>
                        <p className="mt-1 text-end">
                            Back to <NavLink className="text-hover" to="/login">Login</NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ResetPassword