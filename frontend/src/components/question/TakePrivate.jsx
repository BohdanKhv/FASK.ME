import { useDispatch, useSelector } from 'react-redux';
import { lockIcon, arrowRepeatIcon } from '../../constance/icons';
import { ReceiverGate, Tooltip } from '../';
import { updateQuestion } from '../../features/question/questionSlice';

const TakePrivate = ({question}) => {
    const dispatch = useDispatch();
    const { isCreateLoading } = useSelector((state) => state.question);

    return (
        question.metaData.isAnswered && (
            <ReceiverGate
                receiver={question.receiver ? question.receiver : null}
            >
                <Tooltip
                    content="Mark as Private"
                    classList="ml-1"
                >
                    {isCreateLoading ? (
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
                                    metaData: {
                                        ...question.metaData,
                                        isPrivate: true
                                    }
                                }))
                            }
                        >
                            {lockIcon}
                        </div>
                    )}
                </Tooltip>
            </ReceiverGate>
        )
    )
}

export default TakePrivate