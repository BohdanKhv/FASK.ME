import { useSelector } from "react-redux";


const AuthUserControl = ({children}) => {
    const { user } = useSelector((state) => state.auth);
    const { profile } = useSelector(state => state.profile);

    return (
        profile && ( user._id === profile.user._id ) ? children : null
    )
}

export default AuthUserControl