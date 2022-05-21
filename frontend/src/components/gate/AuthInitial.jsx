import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getReceivedQuestions } from "../../features/inbox/inboxSlice";

const AuthInitial = ({children}) => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const { user } = useSelector((state) => state.auth);
    const { skip, limit } = useSelector((state) => state.question);

    // useEffect(() => {
    //     if (user) {
    //         dispatch(getReceivedQuestions({
    //             skip,
    //             limit
    //         }));
    //     }
    // }, [pathname]);

    return children
}

export default AuthInitial;