import { useState } from 'react';
import { downArrow, pinIcon, trashIcon, answareIcon, questionIcon } from '../../constance/icons';
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
                    <div className="question flex align-center">
                        {questionIcon}
                    </div>
                    <p>
                        {question?.question}
                    </p>
                </div>
                <div className="toggle-icon flex align-center">
                    {downArrow}
                </div>
            </div>
            <div 
                className="question-card-body flex-align-center"
            >
                <div className="flex flex-align-center">
                    <div className="answer flex align-center">
                        {answareIcon}
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