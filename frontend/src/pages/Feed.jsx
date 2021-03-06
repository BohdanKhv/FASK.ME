import { useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { arrowRepeatIcon } from "../constance/icons";
import { getFollowersQuestions, getSentQuestions, reset } from '../features/question/questionSlice';
import { CreateFAQ, Navbar, QuestionCard, Tooltip, Image, Inbox } from "../components";
import { bgColor } from "../constance/userMiddleware";
import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebase';


const Feed = () => {
    const dispatch = useDispatch()
    const location = useLocation().pathname.split("/")[1]
    const { user } = useSelector((state) => state.auth);
    const { questions, hasMore, isLoading } = useSelector(state => state.question);

    const getData = () => {
        if(!location) {
            logEvent(analytics, 'view_feed_question', {
                user_id: user._id,
                user_username: user.username
            });

            return dispatch(getFollowersQuestions());
        } else if(location === 'sent') {
            return dispatch(getSentQuestions());
        }
    }

    const observer = useRef();
    const lastQuestionElementRef = useCallback(node => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                const promise = getData();
        
                return () => {
                    promise && promise.abort();
                    dispatch(reset());
                }
            }
        });
        if (node) observer.current.observe(node);
    }, [isLoading, hasMore]);

    useEffect(() => {
        const promise = getData();
        document.title = `Fask.me | ${location ? location : 'Feed'}`;

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
                            <div className={`avatar avatar-md ${bgColor(user.username)}`}>
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
                                return <div ref={lastQuestionElementRef} key={`question-${question._id}`}>
                                        <QuestionCard question={question} />
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