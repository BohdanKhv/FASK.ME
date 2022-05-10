import { useState } from 'react';
import { downArrow, pinIcon, trashIcon } from '../../constance/icons';
import './styles/QuestionCard.css';


const QuestionCard = () => {
    const [showAnswer, setShowAnswer] = useState(false);
    const [testClick, setTestClick] = useState(false);

    return (
        <div 
            className={`question-card${showAnswer ? ' show-answer' : ''}`}
        >
            <div 
                className="question-card-header flex flex-align-center space-between"
                onClick={() => setShowAnswer(!showAnswer)}
            >
                <div className="flex flex-align-center">
                    <div className="question text-center">
                        Q
                    </div>
                    <p>
                        When is the new album comming out?
                    </p>
                </div>
                {downArrow}
            </div>
            <div 
                className="question-card-body flex-align-center"
            >
                <div className="flex flex-align-center">
                    <div className="answer text-center">
                        A
                    </div>
                    <p>
                        It's coming out on December 1st, 2076.
                    </p>
                </div>
            </div>
            {/* <div className="question-card-footer flex flex-end">
                <div
                    onClick={() => setTestClick(!testClick)}
                    className={`btn-icon${testClick ? ' active' : ' unactive'}`}
                    title="Pin"
                >
                    {pinIcon}
                </div>
            </div> */}
        </div>
    )
}

export default QuestionCard