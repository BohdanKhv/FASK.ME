import { useSelector } from "react-redux";

const Following = () => {
    const { profile } = useSelector((state) => state.profile);

    return (
        <div className="text-hover text-hover-secondary text-xs">
            Following - {profile.following.length}
        </div>
    )
}

export default Following