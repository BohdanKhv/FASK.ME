import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProfile, reset } from "../features/profile/profileSlice";
import { Profile, Questions } from "../components";


const User = () => {
    const dispatch = useDispatch();
    const username = useParams().username;

    useEffect(() => {
        dispatch(getProfile(username));

        return () => {
            dispatch(reset());
        }
    }, [dispatch, username]);

    return (
        <main className="user">
            <Profile/>
            <Questions/>
        </main>
    )
}

export default User