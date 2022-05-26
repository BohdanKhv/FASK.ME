import { useDispatch, useSelector } from 'react-redux';
import { trashIcon, arrowRepeatIcon } from '../../constance/icons';
import { deleteQuestion } from '../../features/question/questionSlice';
import { RecSenGate } from '../';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebase';

const DeleteQuestion = ({question}) => {
    const dispatch = useDispatch();
    const { loadingId } = useSelector((state) => state.question);
    const inbox = useSelector((state) => state.inbox);

    return (
        <RecSenGate
            sender={question.sender}
            receiver={question.receiver ? question.receiver : null}
        >
            <div 
                className={`btn mb-1${(loadingId && loadingId === question._id) || (inbox.loadingId && inbox.loadingId === question._id) ? " spinner" : ""}`}
                onClick={() => {
                    dispatch(deleteQuestion(question._id));

                    logEvent(analytics, 'delete_question', {
                        question_id: question._id,
                        question_title: question.question,
                        question_sender_id: question.sender._id,
                        question_sender_username: question.sender.username,
                        question_receiver_id: question.receiver ? question.receiver._id : null,
                        question_receiver_username: question.receiver ? question.receiver.username : null
                    });
                }}
            >
                {
                    (
                        (loadingId && loadingId === question._id) || 
                        (inbox.loadingId && inbox.loadingId === question._id)
                    ) ? arrowRepeatIcon : trashIcon} <span>Delete</span>
            </div>
        </RecSenGate>
    )
}

export default DeleteQuestion