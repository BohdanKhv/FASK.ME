import { useDispatch } from "react-redux"
import { logout } from "../features/auth/authService"

const Home = () => {
    const dispatch = useDispatch()

    return (
        <div onClick={() => dispatch(logout())}>Home</div>
    )
}

export default Home