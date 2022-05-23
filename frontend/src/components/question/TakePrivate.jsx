import { useDispatch, useSelector } from 'react-redux';
import { lockIcon, arrowRepeatIcon, unlockIcon } from '../../constance/icons';
import { ReceiverGate, Tooltip } from '../';
import { updateQuestion } from '../../features/question/questionSlice';

const TakePrivate = ({question}) => {
    const dispatch = useDispatch();
    const { loadingId } = useSelector((state) => state.question);

    return (
        question.isAnswered && (
            <ReceiverGate
                receiver={question.receiver ? question.receiver : null}
            >
                <Tooltip
                    content={question.isPrivate ? 'Unlock' : 'Lock'}
                    classList="ml-1"
                >
                    {loadingId && loadingId === question._id ? (
                        <div 
                            className="btn-icon spinner"
                        >
                            {arrowRepeatIcon}
                            </div>
                    ) : (
                        <div 
                            className="btn-icon"
                            onClick={() => 
                                dispatch(
                                    updateQuestion({
                                    _id: question._id,
                                    isPrivate: !question.isPrivate,
                                }))
                            }
                        >
                            {question.isPrivate ? unlockIcon : lockIcon}
                        </div>
                    )}
                </Tooltip>
            </ReceiverGate>
        )
    )
}

export default TakePrivate