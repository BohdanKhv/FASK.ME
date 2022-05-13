import { useSelector } from "react-redux";
import { Main, Feed } from "../pages";
import { AuthInitial } from "../components";


const Home = () => {
    const user = useSelector(state => state.auth.user)

    return user ? <AuthInitial><Feed /></AuthInitial> : <Main />
}

export default Home