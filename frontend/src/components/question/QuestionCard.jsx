import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { starFillIcon, downArrow } from '../../constance/icons';
import { QuestionMenu, ViewCount, UserInfo } from '../';
import './styles/QuestionCard.css';
import { PostAnswer, ReceiverGate, SenderGate, PinnedQuestion } from '../';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebase';


const QuestionCard = ({question, isOpen}) => {
    const { user } = useSelector((state) => state.auth);
    const [showAnswer, setShowAnswer] = useState(isOpen || false);
    const ethPrice = useSelector((state) => state.local.ethPrice);


    return (
        question && (
        <div 
            className={`question-card${showAnswer ? ' show-answer' : ''}`}
        >
            <div 
                className="question-card-header"
            >
                <div className="sender flex space-between">
                    <UserInfo 
                        profile={question.isAnonymous ? 'Anonymous' : question.sender.profile}
                        secondary={question.type === 'faq' ? 'FAQ' : 'Asked' }
                    />
                    <div className="created-at min-width-fit-content">
                        <div className="time">
                            {new Date(question.createdAt).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' })}
                        </div>
                        <div className="date">
                            {new Date(question.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                    </div>
                </div>
                <div
                    className="flex space-between open-question content"
                    onClick={() => {
                        if(!showAnswer) {
                            logEvent(analytics, 'view_question', {
                                user_id: user ? user._id : null,
                                user_username: user ? user.username : null,
                                question_id: question._id,
                                question_title: question.question,
                            });
                        }
                        setShowAnswer(!showAnswer);
                    }}
                >
                    <div className="flex-grow">
                        <div className="flex">
                            <div className="flex-grow">
                                <p>
                                    Q | {question?.question}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="toggle-icon flex align-center ml-1">
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
                            A | {question.isPremium && question.answer === 'Premium question' ? 
                            "This is a premium question. You need to be a premium member to see the answer." : question.answer}
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
                    <div className="user-info flex flex-align-center min-width-0">
                        {question.type !== 'faq' && question.receiver && (
                            <UserInfo 
                                profile={question.receiver.profile}
                                secondary={!question.isAnswered ? 'Pending' : 'Answered'}
                            />
                        )}
                    </div>
                    <div 
                        className="flex actions"
                    >
                        <ViewCount
                            question={question}
                            showAnswer={showAnswer}
                        />
                        {question.isPremium && (
                            <div 
                                className="btn-icon btn-icon-transparent btn-icon-sm ml-4"
                                title={`You need to be a premium member to see the answer.`}
                            >
                                {starFillIcon}
                            </div>
                        )}
                        <PinnedQuestion
                            question={question}
                        />
                        {user && (user._id === question.sender._id || (question.receiver && user._id === question.receiver._id)) && (
                            <QuestionMenu
                                question={question}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
        )
    )
}

export default QuestionCard