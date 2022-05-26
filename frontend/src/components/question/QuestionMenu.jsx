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
                headerNone={true}
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
                <div 
                    className="btn"
                    onClick={() => setIsOpen(false)}
                >
                    {closeIcon} <span>Close</span>
                </div>
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