import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProfile, reset } from "../features/profile/profileSlice";
import { Profile, Questions, AuthInitial } from "../components";


const User = () => {
    const dispatch = useDispatch();
    const username = useParams().username;
    const { profile } = useSelector((state) => state.profile);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        const promise = dispatch(getProfile({
            username: username,
            uId: user ? user._id : null,
        }));

        return () => {
            promise.abort();
            dispatch(reset());
        }
    }, [dispatch, username]);

    return (
        <main className="user">
            <AuthInitial>
                <Profile/>
                {profile && (
                    <Questions/>
                )}
            </AuthInitial>
        </main>
    )
}

export default User