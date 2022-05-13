import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createQuestion } from '../../features/question/questionSlice';
import { Input, AuthGate, Checkmark, Tooltip } from '../';
import { arrowRepeatIcon, anonymousIcon } from '../../constance/icons';
import { Alert } from '../';


const Ask = () => {
    const { profile } = useSelector(state => state.profile);
    const { isSuccess, isLoading, msg } = useSelector(state => state.question);
    const dispatch = useDispatch();
    const [question, setQuestion] = useState({
        question: '',
        anonymous: false,
    });
    const [err, setErr] = useState(false);

    const onChangeCheckmark = (value) => {
        setQuestion({
            ...question,
            anonymous: value,
        });
    }

    const onSubmit = () => {
        if (question.question.length > 1) {
            setErr(false);
            const data = {
                question: question.question,
                receiver: profile.user._id,
                anonymous: question.anonymous,
                type: 'ask',
            }

            dispatch(createQuestion(data));
            setQuestion({
                question: '',
                anonymous: false,
            });
        } else {
            setErr(true);
        }
    }

    return (
        <AuthGate>
            <div className="profile-settings flex align-center">
                {isSuccess ? (
                    <div className="success-msg">Your question has been sent</div>
                ) : (
                <>
                    <Tooltip
                        content="Ask a question anonymously"
                    >
                        <Checkmark
                            value={question.anonymous}
                            icon={anonymousIcon}
                            onChange={onChangeCheckmark}
                        />
                    </Tooltip>
                    <div className="input-alert">
                        <Alert
                            status="danger"
                            message={msg}
                        />
                        <Input 
                            type="text"
                            name="question"
                            placeholder="Your question"
                            label="Your question"
                            bodyStyle={{
                                borderColor: err ? 'var(--color-danger)' : '',
                                margin: '0 1rem'
                            }}
                            inputStyle={{
                                height: '33px',
                                opacity: '1',
                                padding: '0.5rem 0',
                            }}
                            labelStyle={{
                                display: 'none',
                            }}
                            value={question.question}
                            onChange={(e) => {
                                if(err) {
                                    setErr(false);
                                }
                                setQuestion({
                                    ...question,
                                    question: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <Tooltip
                        content={`You can ask a question only once, until ${profile.username} answers it.`}
                    >
                        <div 
                            className="btn btn-primary"
                            onClick={isLoading ? null : onSubmit}
                        >
                            {isLoading ? <div className="spinner">{arrowRepeatIcon}</div> : 'Ask'}
                        </div>
                    </Tooltip>
                </>
                )}
            </div>
        </AuthGate>
    )
}

export default Ask