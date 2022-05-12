import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createQuestion } from '../../features/question/questionSlice';
import { Input, AuthGate} from '../';
import { arrowRepeatIcon } from '../../constance/icons';

const Ask = () => {
    const { profile } = useSelector(state => state.profile);
    const { isSuccess, isLoading } = useSelector(state => state.question);
    const dispatch = useDispatch();
    const [question, setQuestion] = useState('');
    const [err, setErr] = useState(false);

    const onSubmit = () => {
        if (question) {
            setErr(false);
            const data = {
                question: question,
                receiver: profile.user._id,
                type: 'ask',
            }

            dispatch(createQuestion(data));
            setQuestion('');
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
                    <Input 
                        type="text"
                        name="question"
                        placeholder="Your question"
                        label="Your question"
                        bodyStyle={{
                            width: '600px',
                            borderColor: err ? 'var(--color-danger)' : '',
                        }}
                        inputStyle={{
                            height: '33px',
                            opacity: '1',
                            padding: '0.5rem 0',
                        }}
                        labelStyle={{
                            display: 'none',
                        }}
                        value={question}
                        onChange={(e) => {
                            if(err) {
                                setErr(false);
                            }
                            setQuestion(e.target.value); 
                        }}
                    />
                    <div 
                        className="btn btn-primary ml-1"
                        onClick={isLoading ? null : onSubmit}
                    >
                        {isLoading ? <div className="spinner">{arrowRepeatIcon}</div> : 'Ask'}
                    </div>
                </>
                )}
            </div>
        </AuthGate>
    )
}

export default Ask