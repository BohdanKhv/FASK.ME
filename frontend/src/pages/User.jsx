import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getProfile, reset } from "../features/profile/profileSlice";
import { Profile, Questions, AuthInitial } from "../components";
import { homePathNames } from '../constance/localData';
import { reservedUsernames } from "../constance/reservedUsernames";


const User = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const username = useParams().username;
    const { profile } = useSelector((state) => state.profile);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        let promise = null;

        if ( homePathNames.includes(username) ) {
            navigate('/');
        } else if ( reservedUsernames.includes(username) || username.length < 3 ) {
            navigate('/');
        } else if(username) {
            promise = dispatch(getProfile(username));
        }

        return () => {
            promise && promise.abort();
            dispatch(reset());
        }
    }, [dispatch, username]);

    return (
        <div className="container">
        <main className="user flex flex-column min-100-vh">
            <AuthInitial>
                <Profile/>
                {profile && (
                    <Questions/>
                )}
            </AuthInitial>
        </main>
        </div>
    )
}

export default User