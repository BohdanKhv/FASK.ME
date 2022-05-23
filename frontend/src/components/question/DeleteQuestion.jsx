import { useDispatch, useSelector } from 'react-redux';
import { trashIcon, arrowRepeatIcon } from '../../constance/icons';
import { deleteQuestion } from '../../features/question/questionSlice';
import { RecSenGate } from '../';

const DeleteQuestion = ({question}) => {
    const dispatch = useDispatch();
    const { loadingId } = useSelector((state) => state.question);

    return (
        <RecSenGate
            sender={question.sender}
            receiver={question.receiver ? question.receiver : null}
        >
            <div 
                className={`btn mb-1${loadingId && loadingId === question._id ? ' spinner' : ''}`}
                onClick={() => 
                    dispatch(deleteQuestion(question._id))
                }
            >
                <span className="mr-1">{loadingId && loadingId === question._id ? arrowRepeatIcon : trashIcon}</span>Delete
            </div>
        </RecSenGate>
    )
}

export default DeleteQuestion