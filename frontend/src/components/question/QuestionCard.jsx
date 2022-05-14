import { useState } from 'react';
import { Link } from 'react-router-dom';
import { downArrow, answareIcon, questionIcon } from '../../constance/icons';
import { TakePrivate, DeleteQuestion } from '../';
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