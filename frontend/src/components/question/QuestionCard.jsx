import { useState } from 'react';
import { downArrow, pinIcon, trashIcon } from '../../constance/icons';
import './styles/QuestionCard.css';


const QuestionCard = ({question, isLoading}) => {
    const [showAnswer, setShowAnswer] = useState(false);
    const [testClick, setTestClick] = useState(false);

    return (
        <div 
            className={`question-card${showAnswer ? ' show-answer' : ''}${isLoading ? ' blink': ''}`}
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
                        {question?.question}
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
                        {question?.answer}
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