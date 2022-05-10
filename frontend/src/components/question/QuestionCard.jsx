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
                className="question-card-header flex align-center"
                onClick={() => setShowAnswer(!showAnswer)}
            >
                <div className="flex">
                    <div className="question flex align-center">
                        Q
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque velit sint eaque repellat est eum quis suscipit sequi hic corrupti.
                    </p>
                </div>
                {downArrow}
            </div>
            <div 
                className="question-card-body"
            >
                <div className="flex">
                    <div className="answer flex align-center">
                        A
                    </div>
                    <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate animi aliquam ut ex facere commodi natus fugiat magnam nemo, provident quisquam repellat laborum expedita quo dicta necessitatibus mollitia harum neque consectetur accusamus assumenda. Tempora ducimus soluta iste recusandae commodi! Possimus?
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