import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Textarea, Input } from '../';
import { createQuestion } from '../../features/question/questionSlice';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebase';

const CreateFAQ = ({classList}) => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useSelector(state => state.auth);
    const { ethPrice } = useSelector(state => state.local);
    const [inputErr, setInputErr] = useState({
        question: false,
        answer: false,
    });
    const [faq, setFaq] = useState({
        question: '',
        answer: '',
        price: 0,
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
                price: 0,
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
                type: 'faq',
            }
            faq.price > 0 && (data.price = faq.price);
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
                <div className="form-group">
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
                <div className="flex align-between">
                    <Input
                        label="Set price in ETH (optional)"
                        name="price"
                        bodyStyle={{
                            flexGrow: 1,
                        }}
                        value={faq.price === 0 ? null : faq.price}
                        onChange={(e) => {
                            setFaq({ ...faq, price: e.target.value });
                        }}
                        type="number"
                        isDisabled={isCreateLoading}
                    />
                    <div className="flex align-center px-1 ml-1 border" style={{height: '58px'}}>
                        <p>
                            {(faq.price * ethPrice).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} USD
                        </p>
                    </div>
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