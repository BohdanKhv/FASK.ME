import { useDispatch, useSelector } from 'react-redux';
import { trashIcon, arrowRepeatIcon } from '../../constance/icons';
import { deleteQuestion } from '../../features/question/questionSlice';
import { RecSenGate, Tooltip } from '../';

const DeleteQuestion = ({question}) => {
    const dispatch = useDispatch();
    const { isCreateLoading } = useSelector((state) => state.question);

    return (
        <RecSenGate
            sender={question.sender}
            receiver={question.receiver ? question.receiver : null}
        >
            <Tooltip
                content="Delete"
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
                            dispatch(deleteQuestion(question._id))
                        }
                    >
                        {trashIcon}
                    </div>
                )}
            </Tooltip>
        </RecSenGate>
    )
}

export default DeleteQuestion