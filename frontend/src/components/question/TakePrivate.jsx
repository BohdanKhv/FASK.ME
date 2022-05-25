import { useDispatch, useSelector } from 'react-redux';
import { lockIcon, arrowRepeatIcon, unlockIcon } from '../../constance/icons';
import { ReceiverGate } from '../';
import { updateQuestion } from '../../features/question/questionSlice';

const TakePrivate = ({question}) => {
    const dispatch = useDispatch();
    const { loadingId } = useSelector((state) => state.question);

    return (
        question.isAnswered && (
            <ReceiverGate
                receiver={question.receiver ? question.receiver : null}
            >
                <div 
                    className={`btn mb-1${loadingId && loadingId === question._id ? ' spinner' : ''}`}
                    onClick={() => 
                        dispatch(
                            updateQuestion({
                            _id: question._id,
                            isPrivate: !question.isPrivate,
                        }))
                    }
                >
                    {loadingId && loadingId === question._id ? arrowRepeatIcon : question.isPrivate ? lockIcon : unlockIcon} <span>{question.isPrivate ? 'Mark as Public' : 'Mark as Private'}</span>
                </div>
            </ReceiverGate>
        )
    )
}

export default TakePrivate