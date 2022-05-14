import { useSelector } from "react-redux";

const SenderGate = ({ children, sender }) => {
    const { user } = useSelector((state) => state.auth);

    return (user && ((user._id === sender) || (sender && user._id === sender._id))) ? children : null;
}

export default SenderGate