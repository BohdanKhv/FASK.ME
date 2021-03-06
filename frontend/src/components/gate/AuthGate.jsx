import { useSelector } from "react-redux";

const AuthGate = ({ children }) => {
    const { user } = useSelector((state) => state.auth);
    const { profile } = useSelector(state => state.profile);

    return (user && ( !profile || profile && profile.user._id !== user._id )) ? children : null;
}

export default AuthGate