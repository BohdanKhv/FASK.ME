import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Textarea } from '../';
// import {   } from '../../features/question/questionSlice';

const CreateFAQ = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [err, setErr] = useState('');
    const dispatch = useDispatch();
    const [faq, setFaq] = useState({
        question: '',
        answer: '',
        link: '',
        tags: '',
    });
    

    const onSubmit = () => {
        if(faq.question && faq.answer) {
            setErr('');

        } else {
            setErr('Please fill all the fields');
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
                onSubmitDanger={() => { setIsOpen(false) }}
            >
                <div className="edit-profile-form">
                    <div className="form-group">
                        <Textarea
                            label="Q | Enter your question"
                            name="question"
                            value={faq.question}
                            onChange={(e) => { setFaq({ ...faq, question: e.target.value }) }}
                            rows={3}
                            cols={5}
                        />
                    </div>
                </div>
                <div className="edit-profile-form">
                    <div className="form-group">
                        <Textarea
                            label="A | Enter your answer"
                            name="answer"
                            value={faq.answer}
                            onChange={(e) => { setFaq({ ...faq, answer: e.target.value }) }}
                            rows={3}
                            cols={5}
                        />
                    </div>
                </div>
                {err && <div className="text-danger px-1 pt-1">{err}</div>}
            </Modal>
            <div 
                className="btn btn-primary ml-1"
                onClick={onSubmit}
            >
                Create FAQ
            </div>
        </div>
    )
}

export default CreateFAQ