import { useSelector } from "react-redux";
import { Main, Feed } from "../pages";

const Home = () => {
    const user = useSelector(state => state.auth.user)

    return user ? <Feed /> : <Main />
}

export default Home