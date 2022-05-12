import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input, AuthGate} from '../';

const Ask = () => {
    const dispatch = useDispatch();
    const [question, setQuestion] = useState('');
    const [err, setErr] = useState(false);

    const onSubmit = () => {
        if (question) {
            setErr(false);
            console.log(question);
        } else {
            setErr(true);
        }
    }

    return (
        <AuthGate>
            <div className="profile-settings flex align-center">
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
                    onChange={(e) => {
                        if(err) {
                            setErr(false);
                        }
                        setQuestion(e.target.value); 
                    }}
                />
                <div 
                    className="btn btn-primary ml-1"
                    onClick={onSubmit}
                >
                    Ask
                </div>
            </div>
        </AuthGate>
    )
}

export default Ask