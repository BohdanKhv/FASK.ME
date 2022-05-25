import { useDispatch, useSelector } from 'react-redux';
import { trashIcon, arrowRepeatIcon } from '../../constance/icons';
import { deleteQuestion } from '../../features/question/questionSlice';
import { RecSenGate } from '../';

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
                onClick={() => 
                    dispatch(deleteQuestion(question._id))
                }
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