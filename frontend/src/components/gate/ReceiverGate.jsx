import { useSelector } from "react-redux";

const ReceiverGate = ({children, receiver}) => {
    const { user } = useSelector((state) => state.auth);

    return (user._id === receiver || (receiver && user._id === receiver._id)) && children;
}

export default ReceiverGate