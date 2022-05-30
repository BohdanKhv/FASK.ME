import { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReceivedQuestions, reset } from '../../features/inbox/inboxSlice';
import { QuestionCard } from "../";


const Inbox = () => {
    const dispatch = useDispatch()
    const { inbox, skip, limit, hasMore, isLoading } = useSelector((state) => state.inbox);

    const observer = useRef();
    const lastQuestionElementRef = useCallback(node => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                const promise = dispatch(getReceivedQuestions());
        
                return () => {
                    promise && promise.abort();
                }
            }
        });
        if (node) observer.current.observe(node);
    }, [isLoading, hasMore]);

    useEffect(() => {
        let promise = null;

        if(inbox.length === 0) {
            promise = dispatch(getReceivedQuestions());
        }

        return () => {
            promise && promise.abort();
            dispatch(reset());
        }
    }, [])

    return (
        <>
        {!isLoading && inbox.length === 0 ? (
                <p className="title-3 text-center">
                    Your inbox is empty.
                </p>
            ) : (
                inbox.map((question, index) => {
                    if(inbox.length === index + 1) {
                        return <div ref={lastQuestionElementRef} key={`question-${question._id+index}`}>
                                <QuestionCard key={`questions-${question._id+index}`} question={question} />
                            </div>
                    } else {
                        return <QuestionCard key={`questions-${question._id+index}`} question={question} />
                    }
                })
            )}
        </>
    )
}

export default Inbox