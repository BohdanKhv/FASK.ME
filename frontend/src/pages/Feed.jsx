import { useDispatch } from "react-redux";
import { inboxIcon, sentIcon,  } from "../constance/icons";
import { Navbar } from "../components";

const feedNavigation = [
    {
        name: 'Inbox',
        icon: inboxIcon,
        path: '/',
    },
    {
        name: 'Sent',
        icon: sentIcon,
        path: '/sent',
    },
];

const Feed = () => {
    const dispatch = useDispatch()

    return (
        <section className="feed-page">
            <Navbar
                links={feedNavigation}
            />
        </section>
    )
}

export default Feed