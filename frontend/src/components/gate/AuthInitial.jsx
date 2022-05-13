import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReceivedQuestions } from "../../features/question/questionSlice";

const AuthInitial = ({children}) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            dispatch(getReceivedQuestions());
        }
    }, [user]);

    return children
}

export default AuthInitial;