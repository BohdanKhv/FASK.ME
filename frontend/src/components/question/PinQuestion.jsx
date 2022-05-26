import { useSelector, useDispatch } from "react-redux"
import { arrowRepeatIcon, pinIcon } from "../../constance/icons"
import { pinQuestion } from "../../features/question/questionSlice"


const PinQuestion = ({ question }) => {
    const dispatch = useDispatch()
    const loadingId = useSelector((state) => state.question.loadingId)
    const { user } = useSelector((state) => state.auth)

    const handlePin = () => {
        dispatch(pinQuestion(question._id))
    }

    return (
        <div 
            className={`btn mb-1${(loadingId && loadingId === question._id) ? " spinner" : ""}`}
            onClick={(loadingId && loadingId === question._id) ? null : handlePin}
        >
            {
                (loadingId && loadingId === question._id) ? arrowRepeatIcon : pinIcon}
                <span>
                    {user._id === question.sender._id ? question.isSenderPinned ? "Unpin" : "Pin" : null}
                    {question.receiver && user._id === question.receiver._id ? question.isReceiverPinned ? "Unpin" : "Pin" : null}
                </span>
        </div>
    )
}

export default PinQuestion