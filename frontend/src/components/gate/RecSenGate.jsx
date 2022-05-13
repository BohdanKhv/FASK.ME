import { useSelector } from "react-redux"

const RecSenGate = ({ children, receiver, sender }) => {
    const { user } = useSelector((state) => state.auth);

    return (
        (user._id === receiver || (receiver && user._id === receiver._id) )|| 
        (user._id === sender || (sender && user._id === sender._id))
        ) && children;
}

export default RecSenGate