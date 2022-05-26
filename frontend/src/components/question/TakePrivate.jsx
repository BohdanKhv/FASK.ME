import { useDispatch, useSelector } from 'react-redux';
import { lockIcon, arrowRepeatIcon, unlockIcon } from '../../constance/icons';
import { ReceiverGate } from '../';
import { updateQuestion } from '../../features/question/questionSlice';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebase';

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
                    onClick={() => {
                        dispatch(
                            updateQuestion({
                            _id: question._id,
                            isPrivate: !question.isPrivate,
                        }));

                        logEvent(analytics, 'take_private', {
                            question_id: question._id,
                            question_title: question.question,
                            question_sender_id: question.sender._id,
                            question_sender_username: question.sender.username,
                            question_receiver_id: question.receiver ? question.receiver._id : null,
                            question_receiver_username: question.receiver ? question.receiver.username : null,
                            is_private: !question.isPrivate
                        });
                    }}
                >
                    {loadingId && loadingId === question._id ? arrowRepeatIcon : question.isPrivate ? lockIcon : unlockIcon} <span>{question.isPrivate ? 'Mark as Public' : 'Mark as Private'}</span>
                </div>
            </ReceiverGate>
        )
    )
}

export default TakePrivate