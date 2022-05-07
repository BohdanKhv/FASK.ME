import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";


const UserControl = ({children}) => {
    const username = useParams().username;
    const user = useSelector((state) => state.auth.user);

    return (
        username === user.username ? children : null
    )
}

export default UserControl