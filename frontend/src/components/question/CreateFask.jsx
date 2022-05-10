import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Textarea } from '../';

const CreateFask = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const [fask, setFask] = useState({
        question: '',
        answer: '',
        link: '',
        tags: '',
    });

    return (
        <div className="edit-profile">
            <Modal
                modalIsOpen={isOpen}
                setModalIsOpen={setIsOpen}
                contentLabel="Create Fask"
                actionDangerBtnText="Cancel"
                actionBtnText="Post"
                onSubmitDanger={() => { setIsOpen(false) }}
            >
                <div className="edit-profile-form">
                    <div className="form-group">
                        <Textarea
                            label="Q | Question"
                            name="question"
                            value={fask.question}
                            onChange={(e) => { setFask({ ...fask, question: e.target.value }) }}
                            rows={3}
                            cols={5}
                        />
                    </div>
                </div>
                <div className="edit-profile-form">
                    <div className="form-group">
                        <Textarea
                            label="A | Answer"
                            name="answer"
                            value={fask.answer}
                            onChange={(e) => { setFask({ ...fask, answer: e.target.value }) }}
                            rows={3}
                            cols={5}
                        />
                    </div>
                </div>
            </Modal>
            <div 
                className="btn btn-primary ml-1"
                onClick={() => { setIsOpen(true) }}
            >
                Fask
            </div>
        </div>
    )
}

export default CreateFask