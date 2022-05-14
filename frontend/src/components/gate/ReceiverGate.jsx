import { useSelector } from "react-redux";

const ReceiverGate = ({children, receiver}) => {
    const { user } = useSelector((state) => state.auth);

    return (user && (user._id === receiver || (receiver && user._id === receiver._id))) ? children : null;
}

export default ReceiverGate