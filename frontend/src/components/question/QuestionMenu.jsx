import { useState } from 'react';
import { moreIcon } from '../../constance/icons';
import { DeleteQuestion, TakePrivate, Modal } from '../';

const QuestionMenu = ({ question }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Modal
                modalIsOpen={isOpen}
                setModalIsOpen={setIsOpen}
                headerNone={true}
                footerNone={true}
            >
                <DeleteQuestion
                    question={question}
                />
                <TakePrivate
                    question={question}
                />
                <div 
                    className="btn"
                    onClick={() => setIsOpen(false)}
                >
                    Close
                </div>
            </Modal>
            <div 
                className="btn-icon btn-icon-sm ml-1"
                onClick={() => setIsOpen(true)}
            >
                {moreIcon}
            </div>
        </>
    )
}

export default QuestionMenu