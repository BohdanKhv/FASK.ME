import { useState } from 'react';
import { Link } from 'react-router-dom';
import { downArrow, answareIcon, questionIcon } from '../../constance/icons';
import { TakePrivate, DeleteQuestion, ClickCount } from '../';
import './styles/QuestionCard.css';
import { PostAnswer, ReceiverGate, SenderGate } from '../';


const QuestionCard = ({question, isOpen}) => {
    const [showAnswer, setShowAnswer] = useState(isOpen || false);

    return (
        question && (
        <div 
            className={`question-card${showAnswer ? ' show-answer' : ''}`}
        >
            <div 
                className="question-card-header"
            >
                {question.sender.profile && (
                    <div className="sender flex space-between">
                        <div className="user-info-sender flex">
                            <img className="user-info-avatar" src={question.sender.profile.avatar} alt="avatar" />
                            <div>
                                <Link to={`/${question.sender.profile.username}`} className="user-info-name text-hover">
                                    {question.sender.profile.username}
                                </Link>
                                <div className="status text-xs text-secondary">
                                    { question.type === 'faq' ? (
                                        'FAQ'
                                    ) : (
                                        'Asked'
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="created-at">
                            <div className="date">
                                {new Date(question.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </div>
                            <div className="time">
                                {new Date(question.createdAt).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' })}
                            </div>
                        </div>
                    </div>
                )}
                <div
                    className="flex space-between open-question content"
                    onClick={() => setShowAnswer(!showAnswer)}
                >
                    <div className="flex-grow">
                        <div className="flex">
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
                    {question.answer ? (
                        <p>
                            {question.answer}
                        </p>
                    ) : (
                        <>
                        <ReceiverGate
                            receiver={question.receiver}
                        >
                            <PostAnswer
                                question={question}
                            />
                        </ReceiverGate>
                        <SenderGate
                            sender={question.sender}
                        >
                            <p>
                                No answer yet.
                            </p>
                        </SenderGate>
                        </>
                    )}
                </div>
            </div>
            <div className="question-card-footer">
                <div className="receiver flex space-between">
                    <div className="user-info flex">
                        {question.type !== 'faq' && question.receiver ? (
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
                            <div>
                                <Link to={`/${question.receiver.profile.username}`} className="user-info-name text-hover">
                                    {question.receiver.profile.username}
                                </Link>
                                <div className="status text-xs text-secondary">
                                    {!question.metaData.isAnswered ? (
                                        'Pending'
                                    ) : (
                                        'Answered'
                                    )}
                                </div>
                            </div>
                        </>
                        ) : question.type === 'faq' && (
                            <ClickCount
                                question={question}
                            />
                        )}
                    </div>
                    <div 
                        className="flex actions"
                    >
                        <DeleteQuestion
                            question={question}
                        />
                        <TakePrivate
                            question={question}
                        />
                    </div>
                </div>
            </div>
        </div>
        )
    )
}

export default QuestionCard