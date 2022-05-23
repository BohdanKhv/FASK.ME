import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip, SenderGate } from '../';
import { incrementViewCount } from '../../features/question/questionSlice';

const ViewCount = ({question, showAnswer}) => {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();


    useEffect(() => {
        let timeout = null;

        if (showAnswer && question.answer) {
            timeout = setTimeout(() => {
                if(!user || (user && user._id !== question.sender._id && user._id !== question.receiver._id)) {
                    dispatch(incrementViewCount(question._id));
                }
            }, 2000);
        }

        return () => timeout && clearTimeout(timeout);
    }, [showAnswer]);

    return (
        // <SenderGate
        //     sender={question.sender}
        // >
            <Tooltip
                content={`Views`}
            >
                <div className="btn-icon">
                    {question.views ? question.views : 0}
                </div>
            </Tooltip>
        // </SenderGate>
    )
}

export default ViewCount