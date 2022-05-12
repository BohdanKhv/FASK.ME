import { useDispatch } from "react-redux"
import { logout } from "../features/auth/authService"

const Feed = () => {
    const dispatch = useDispatch()

    return (
        <div onClick={() => dispatch(logout())}>Feed</div>
    )
}

export default Feed