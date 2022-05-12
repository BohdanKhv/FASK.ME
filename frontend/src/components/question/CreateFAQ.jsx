import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { answareIcon, questionIcon } from '../../constance/icons';
import { Modal, Textarea } from '../';
import { createQuestion } from '../../features/question/questionSlice';

const CreateFAQ = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputErr, setInputErr] = useState({
        question: false,
        answer: false,
    });
    const [faq, setFaq] = useState({
        question: '',
        answer: '',
    });
    const { isError, isLoading, isSuccess, msg } = useSelector(state => state.question);
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
            });
        }
    }, [isSuccess]);


    const onSubmit = () => {
        if(faq.question.length > 0 && faq.answer.length > 0) {
            const data = {
                question: faq.question,
                answer: faq.answer,
                type: 'faq',
                isPinned: true,
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
        <div className="edit-profile">
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
                isLoading={isLoading}
            >
                <div className="edit-profile-form">
                    <div className="form-group">
                        <Textarea
                            label="Enter your question"
                            name="question"
                            icon={questionIcon}
                            value={faq.question}
                            bodyStyle={{
                                borderColor: inputErr.question ? 'var(--color-danger)' : '',
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
                        />
                    </div>
                </div>
                <div className="edit-profile-form">
                    <div className="form-group">
                        <Textarea
                            label="Enter your answer"
                            name="answer"
                            icon={answareIcon}
                            value={faq.answer}
                            bodyStyle={{
                                borderColor: inputErr.answer ? 'var(--color-danger)' : '',
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
                        />
                    </div>
                </div>
                {isError && <div className="text-danger px-1 pt-1">{msg}</div>}
            </Modal>
            <div 
                className="btn btn-primary ml-1"
                onClick={() => { setIsOpen(true) }}
            >
                Create FAQ
            </div>
        </div>
    )
}

export default CreateFAQ