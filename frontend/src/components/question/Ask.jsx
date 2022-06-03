import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createQuestion } from '../../features/question/questionSlice';
import { Textarea, Switch, Modal, Tooltip } from '../';
import { infoIcon, questionIcon } from '../../constance/icons';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebase';


const Ask = ({classList}) => {
    const [isOpen, setIsOpen] = useState(false);
    const { profile } = useSelector(state => state.profile);
    const { user } = useSelector(state => state.auth);
    const { isSuccess, isCreateLoading, msg, isError } = useSelector(state => state.question);
    const dispatch = useDispatch();
    const [question, setQuestion] = useState({
        question: '',
        isAnonymous: false,
    });
    const [err, setErr] = useState(false);

    const onSubmit = () => {
        if (question.question.length > 1) {
            setErr(false);
            const data = {
                question: question.question,
                receiver: profile.user._id,
                isAnonymous: question.isAnonymous,
                type: 'ask',
            }

            dispatch(createQuestion(data));
            setQuestion({
                question: '',
                isAnonymous: false,
            });

            logEvent(analytics, 'ask_question', {
                user_id: user._id,
                user_username: user.username,
                receiver_id: profile.user._id,
                receiver_username: profile.username,
            });
        } else {
            setErr(true);
        }
    }


    useEffect(() => {
        if(question.question.length > 0 || question.isAnonymous) {
            setQuestion({
                question: '',
                isAnonymous: false,
            });
        }
    }, [isOpen])

    return (
            isSuccess ? (
                <div className={`success-msg${classList ? ' ' + classList : ''}`}>Your question has been sent</div>
            ) : (
            <>
                <Modal
                    modalIsOpen={isOpen}
                    setModalIsOpen={setIsOpen}
                    contentLabel={`Ask ${profile.username}`}
                    isLoading={isCreateLoading}
                    onSubmit={onSubmit}
                    isError={isError}
                    errMsg={msg}
                    actionBtnText="Ask"
                    actionDangerBtnText="Cancel"
                    onSubmitDanger={() => setIsOpen(false)}
                >
                    <div className="mb-1">
                    <Textarea
                        label="Enter your question"
                        name="question"
                        // icon={questionIcon}
                        value={question.question}
                        bodyStyle={{
                            borderColor: err ? 'var(--color-danger)' : '',
                        }}
                        inputStyle={{
                            maxHeight: '20vh',
                        }}
                        onChange={(e) => {
                            if(err) {
                                setErr(true);
                            }
                            setQuestion({
                                ...question,
                                question: e.target.value,
                            });
                        }}
                        rows={3}
                        cols={5}
                        maxLength={500}
                        isDisabled={isCreateLoading}
                    />
                    </div>
                    <div className="flex align-between border p-2">
                        <p className="title-3">Anonymously</p>
                        <Switch
                            onChange={() => {
                                setQuestion({
                                    ...question,
                                    isAnonymous: !question.isAnonymous,
                                });
                            }}
                            
                        />
                    </div>
                </Modal>
                {profile.canAsk ? (
                    <div 
                        className={`btn btn-sm btn-primary${classList ? ` ${classList}` : ''}`}
                        onClick={() => setIsOpen(true)}
                    >
                        Ask {profile.username}
                    </div>
                ) : (
                    <Tooltip
                        classList={`${classList ? ` ${classList}` : ''}`}
                        content={`You've already sent a question. You have to wait until ${profile.username} responds, or deletes the existing question.`}
                    >
                        <div className={`btn btn-sm btn-primary`}>
                            {infoIcon}
                        </div>
                    </Tooltip>
                )}
            </>
            )
    )
}

export default Ask