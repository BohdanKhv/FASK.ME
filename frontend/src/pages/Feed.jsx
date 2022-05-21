import { useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { arrowRepeatIcon } from "../constance/icons";
import { getFollowersQuestions, getSentQuestions, reset } from '../features/question/questionSlice';
import { CreateFAQ, Navbar, QuestionCard, Tooltip, Image, Inbox } from "../components";


const Feed = () => {
    const dispatch = useDispatch()
    const location = useLocation().pathname.split("/")[1]
    const { user } = useSelector((state) => state.auth);
    const { questions, skip, limit, hasMore, isLoading } = useSelector(state => state.question);

    const observer = useRef();
    const lastQuestionElementRef = useCallback(node => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                let promise = null;
        
                if(!location) {
                    promise = dispatch(getFollowersQuestions({
                        skip,
                        limit
                    }));
                } else if(location === 'sent') {
                    promise = dispatch(getSentQuestions({
                        skip,
                        limit
                    }));
                }
        
                return () => {
                    promise && promise.abort();
                    dispatch(reset());
                }
            }
        });
        if (node) observer.current.observe(node);
    }, [isLoading, hasMore]);

    useEffect(() => {
        let promise = null;

        if(!location) {
            promise = dispatch(getFollowersQuestions({
                skip,
                limit
            }));
        } else if(location === 'sent') {
            promise = dispatch(getSentQuestions({
                skip,
                limit
            }));
        }

        return () => {
            promise && promise.abort();
            dispatch(reset());
        }
    }, [location])

    return (
        <section className="feed-page container">
            <div className="flex align-between my-1 py-1">
                <div className="flex min-width-0">
                    <div>
                        {user.profile.avatar ? (
                            <Image
                                image={user.profile.avatar}
                                alt="Avatar"
                                classList="profile-image-md"
                            /> 
                        ) : (
                            <div className="profile-image-placeholder profile-image-placeholder-md">
                                {user.username[0].toUpperCase()}
                            </div>
                        )}
                    </div>
                    <div className="flex-grow overflow-hidden">
                        <div 
                            className="title-4 mx-3 text-nowrap"
                        >
                            {user.username}
                        </div>
                        {user.profile.fullName && (
                            <p className="text-secondary mx-3 text-nowrap">
                                {user.profile.fullName}
                            </p>
                        )}
                    </div>
                </div>
                <div>
                    <Tooltip
                        text="FAQ's are in the expandable card. Click on the card to see the question and answer."
                    />
                    <CreateFAQ />
                </div>
            </div>
            <Navbar />
            <div className="questions">
                {!location || location === 'sent' ? (
                    !isLoading && questions.length === 0 ? (
                        <p className="title-3 text-center">
                            {location === 'sent' ? 'You have not sent any questions yet.' : 'Follow someone to see their questions here.'}
                        </p>
                    ) : (
                        questions.map((question, index) => {
                            if(questions.length === index + 1) {
                                return <div ref={lastQuestionElementRef} key={`question-${question._id+index}`}>
                                        <QuestionCard key={`questions-${question._id}`} question={question} />
                                    </div>
                            } else {
                                return <QuestionCard key={`questions-${question._id}`} question={question} />
                            }
                        })
                    )
                ) : location === 'inbox' && (
                    <Inbox />
                )}
                {isLoading && 
                    <div className="flex align-center mb-1">
                        <div className="btn-icon spinner">{arrowRepeatIcon}</div>
                    </div>
                }
            </div>
        </section>
    )
}

export default Feed