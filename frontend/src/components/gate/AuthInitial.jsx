import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getReceivedQuestions } from "../../features/question/questionSlice";

const AuthInitial = ({children}) => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            dispatch(getReceivedQuestions());
        }
    }, [pathname]);

    return children
}

export default AuthInitial;