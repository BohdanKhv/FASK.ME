import { useState } from 'react';
import { closeIcon, moreIcon } from '../../constance/icons';
import { DeleteQuestion, PinQuestion, TakePrivate, Modal } from '../';

const QuestionMenu = ({ question }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Modal
                modalIsOpen={isOpen}
                setModalIsOpen={setIsOpen}
                contentLabel="Question Menu"
                footerNone={true}
            >
                <PinQuestion
                    question={question}
                />
                <TakePrivate
                    question={question}
                />
                <DeleteQuestion
                    question={question}
                />
            </Modal>
            <div 
                className="btn-icon btn-icon-sm ml-4"
                onClick={() => setIsOpen(true)}
            >
                {moreIcon}
            </div>
        </>
    )
}

export default QuestionMenu