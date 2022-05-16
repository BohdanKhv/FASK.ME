import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Textarea } from "../../components";
import { updateQuestion } from "../../features/question/questionSlice";
import { arrowRepeatIcon } from "../../constance/icons";


const PostAnswer = ({question}) => {
    const dispatch = useDispatch();
    const [answer, setAnswer] = useState("");
    const { isCreateLoading } = useSelector((state) => state.question);

    const onSubmit = () => {
        dispatch(updateQuestion({
            _id: question._id,
            answer,
            isAnswered: true,
        }));
    }
    // well fuck you then
    return (
        <div className="flex-grow">
            <Textarea
                label="Enter your answer"
                name="answer"
                value={answer}
                bodyStyle={{
                    backgroundColor: "var(--color-main)",
                }}
                onChange={(e) => setAnswer(e.target.value)}
                rows={4}
                cols={50}
                maxLength={500}
                isDisabled={isCreateLoading}
                inputStyle={{
                    maxHeight: '20vh',
                }}
            />
            <div className="flex flex-end">
            <div
                className="btn btn-primary spinner btn-sm mt-3"
                onClick={isCreateLoading ? null : onSubmit}
            >
                {isCreateLoading ? arrowRepeatIcon: "Answer"}
            </div>
            </div>
        </div>
    )
}

export default PostAnswer