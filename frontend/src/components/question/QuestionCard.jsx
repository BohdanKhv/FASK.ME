import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { downArrow, pinIcon, trashIcon, answareIcon, questionIcon, lockIcon, arrowRepeatIcon } from '../../constance/icons';
import { ReceiverGate, SenderGate, RecSenGate, Tooltip } from '../';
import { deleteQuestion, updateQuestion } from '../../features/question/questionSlice';
import './styles/QuestionCard.css';


const QuestionCard = ({question, isOpen}) => {
    const dispatch = useDispatch();
    const { isCreateLoading } = useSelector((state) => state.question);
    const [showAnswer, setShowAnswer] = useState(false);
    const [testClick, setTestClick] = useState(false);

    return (
        question && (
        <div 
            className={`question-card${showAnswer || isOpen ? ' show-answer' : ''}`}
        >
            <div 
                className="question-card-header"
            >
                {question.sender.profile && (
                    <div className="sender flex space-between">
                        <div className="user-info-sender flex">
                            <img className="user-info-avatar" src={question.sender.profile.avatar} alt="avatar" />
                            <Link to={`/${question.sender.profile.username}`} className="user-info-name text-hover">
                                @{question.sender.profile.username}
                            </Link>
                        </div>
                        { question.type === 'faq' ? 
                            <div className="title-4">
                                FAQ
                            </div>
                        : 
                            <div className="flex flex-column align-center">
                                <div className="title-4">
                                    Asked
                                </div>
                                <div className="text-xs text-secondary">
                                    {!question.metaData.isAnswered ? (
                                        'Pending'
                                    ) : (
                                        'Answered'
                                    )}
                                </div>
                            </div>
                        }
                    </div>
                )}
                <div
                    className="flex space-between open-question content"
                    onClick={() => setShowAnswer(!showAnswer)}
                >
                    <div className="flex-grow">
                        <div className="flex">
                            <div className="answer flex align-center">
                                {questionIcon}
                            </div>
                            <div className="flex-grow">
                                <p>
                                    {question?.question}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="toggle-icon flex align-center">
                        {downArrow}
                    </div>
                </div>
            </div>
            <div 
                className="question-card-body flex-align-center"
            >
                <div className="flex content">
                    <div className="answer flex align-center">
                        {answareIcon}
                    </div>
                    {question.answer ? (
                        <p>
                            {question.answer}
                        </p>
                    ) : (
                        <p>
                            No answer yet.
                        </p>
                    )}
                </div>
                    <div className="receiver flex space-between">
                        <div className="user-info flex">
                            {question.type !== 'faq' && question.receiver && (
                            <>
                                { question.receiver.profile.avatar ? (
                                    <img
                                        src={ question.receiver.profile.avatar }
                                        alt="Avatar"
                                        className="user-info-avatar"
                                    />
                                ) : (
                                    <div className="profile-image-placeholder">
                                        {question.receiver.profile.username[0].toUpperCase()}
                                    </div>
                                ) }
                                <Link to={`/${question.receiver.profile.username}`} className="user-info-name text-hover">
                                    @{question.receiver.profile.username}
                                </Link>
                            </>
                            )}
                        </div>
                        <div 
                            className="flex actions"
                        >
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
                        </div>
                    </div>
            </div>
        </div>
        )
    )
}

export default QuestionCard