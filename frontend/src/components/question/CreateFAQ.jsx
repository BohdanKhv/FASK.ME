import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Textarea, Switch } from '../';
import { createQuestion } from '../../features/question/questionSlice';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebase';

const CreateFAQ = ({classList}) => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useSelector(state => state.auth);
    const [inputErr, setInputErr] = useState({
        question: false,
        answer: false,
    });
    const [faq, setFaq] = useState({
        question: '',
        answer: '',
        premium: false,
    });
    const { isError, isCreateLoading, isSuccess, msg } = useSelector(state => state.question);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isSuccess) {
            setIsOpen(false);
            setInputErr({
                question: false,
                answer: false,
            });
            setFaq({
                question: '',
                answer: '',
                premium: false,
            });

            logEvent(analytics, 'create_faq', {
                user_id: user._id,
                user_username: user.username,
            });
        }
    }, [isSuccess]);


    const onSubmit = () => {
        if(faq.question.length > 0 && faq.answer.length > 0) {
            const data = {
                question: faq.question,
                answer: faq.answer,
                isPremium: faq.premium,
                type: 'faq',
            }
            dispatch(createQuestion(data));
        } else {
            if(faq.question.length === 0) {
                return setInputErr({
                    ...inputErr,
                    question: true,
                });
            }

            if(faq.answer.length === 0) {
                return setInputErr({
                    ...inputErr,
                    answer: true,
                });
            }
        }
    }


    return (
        <>
            <Modal
                modalIsOpen={isOpen}
                setModalIsOpen={setIsOpen}
                contentLabel="Create FAQ"
                actionDangerBtnText="Cancel"
                actionBtnText="Post"
                onSubmit={onSubmit}
                onSubmitDanger={() => {
                    setIsOpen(false);
                }}
                isLoading={isCreateLoading}
                isError={isError}
                errMsg={msg}
            >
                <div className="mb-1">
                    <Textarea
                        label="Enter your question"
                        name="question"
                        // icon={questionIcon}
                        value={faq.question}
                        bodyStyle={{
                            borderColor: inputErr.question ? 'var(--color-danger)' : '',
                        }}
                        inputStyle={{
                            maxHeight: '20vh',
                        }}
                        onChange={(e) => {
                            if(inputErr.question) {
                                setInputErr({
                                    ...inputErr,
                                    question: false,
                                });
                            }
                            setFaq({ ...faq, question: e.target.value });
                        }}
                        rows={3}
                        cols={5}
                        maxLength={500}
                        isDisabled={isCreateLoading}
                    />
                </div>
                <div className="form-group">
                    <Textarea
                        label="Enter your answer"
                        name="answer"
                        // icon={answareIcon}
                        value={faq.answer}
                        bodyStyle={{
                            borderColor: inputErr.answer ? 'var(--color-danger)' : '',
                        }}
                        inputStyle={{
                            maxHeight: '20vh',
                        }}
                        onChange={(e) => {
                            if(inputErr.answer) {
                                setInputErr({
                                    ...inputErr,
                                    answer: false,
                                });
                            }
                            setFaq({ ...faq, answer: e.target.value });
                        }}
                        rows={3}
                        cols={5}
                        maxLength={500}
                        isDisabled={isCreateLoading}
                    />
                </div>
                <div className="flex align-between border p-2">
                    <p className="title-3">Premium</p>
                    <Switch
                        onChange={() => {
                            setFaq({ ...faq, premium: !faq.premium });
                        }}
                    />
                </div>
            </Modal>
            <div 
                className={`btn btn-sm btn-primary text-nowrap${classList ? ` ${classList}` : ''}`}
                onClick={() => { setIsOpen(true) }}
            >
                Create FAQ
            </div>
        </>
    )
}

export default CreateFAQ