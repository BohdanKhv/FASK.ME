import { useSelector, useDispatch } from "react-redux"
import { arrowRepeatIcon, pinIcon } from "../../constance/icons"
import { pinQuestion } from "../../features/question/questionSlice"
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebase';


const PinQuestion = ({ question }) => {
    const dispatch = useDispatch()
    const loadingId = useSelector((state) => state.question.loadingId)
    const { user } = useSelector((state) => state.auth)

    const handlePin = () => {
        dispatch(pinQuestion(question._id));

        logEvent(analytics, 'pin_question', {
            question_id: question._id,
            question_title: question.question,
            question_sender_id: question.sender._id,
            question_sender_username: question.sender.username,
            question_receiver_id: question.receiver ? question.receiver._id : null,
            question_receiver_username: question.receiver ? question.receiver.username : null
        });
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