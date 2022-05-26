import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Textarea } from "../../components";
import { updateQuestion } from "../../features/question/questionSlice";
import { arrowRepeatIcon } from "../../constance/icons";
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebase';


const PostAnswer = ({question}) => {
    const dispatch = useDispatch();
    const [answer, setAnswer] = useState("");
    const { loadingId } = useSelector((state) => state.inbox);

    const onSubmit = () => {
        dispatch(updateQuestion({
            _id: question._id,
            answer,
            isAnswered: true,
        }));

        logEvent(analytics, 'post_answer', {
            question_id: question._id,
            question_title: question.question,
            question_sender_id: question.sender._id,
            question_sender_username: question.sender.username,
            question_receiver_id: question.receiver ? question.receiver._id : null,
            question_receiver_username: question.receiver ? question.receiver.username : null
        });
    }

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
                isDisabled={(loadingId && (loadingId === question._id)) ? true : false}
                inputStyle={{
                    maxHeight: '20vh',
                }}
            />
            <div className="flex flex-end">
            <div
                className="btn btn-primary spinner btn-sm mt-3"
                onClick={(loadingId && (loadingId === question._id)) ? null : onSubmit}
            >
                {(loadingId && (loadingId === question._id)) ? arrowRepeatIcon: "Answer"}
            </div>
            </div>
        </div>
    )
}

export default PostAnswer