import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { faqIcon, inboxIcon, sentIcon, arrowRepeatIcon } from "../constance/icons";
import { getFollowersQuestions, getSentQuestions, reset } from '../features/question/questionSlice';
import { CreateFAQ, Navbar, QuestionCard, Tooltip } from "../components";


const Feed = () => {
    const dispatch = useDispatch()
    const location = useLocation().pathname.split("/")[1]
    const { user } = useSelector((state) => state.auth);
    const { inbox, questions, isLoading } = useSelector((state) => state.question);


    const feedNavigation = [
        {
            name: 'Following',
            icon: faqIcon,
            path: '/',
        },
        {
            name: 'Inbox',
            icon: inboxIcon,
            path: '/inbox',
            notify: inbox.length > 0,
        },
        {
            name: 'Sent',
            icon: sentIcon,
            path: '/sent',
        },
    ];

    useEffect(() => {
        if(!location) {
            dispatch(getFollowersQuestions())
        } else if(location === 'sent') {
            dispatch(getSentQuestions())
        }

        return () => {
            dispatch(reset())
        }
    }, [location])

    return (
        <section className="feed-page container">
            <div className="flex align-between my-1 py-1">
                <div className="title-1">
                    @{user.username}
                </div>
                <div>
                    <Tooltip
                        text="FAQ's are in the expandable card. Click on the card to see the question and answer."
                    />
                    <CreateFAQ />
                </div>
            </div>
            <Navbar
                links={feedNavigation}
            />
            <div className="questions">
                {!location || location === 'sent' ? (
                    !isLoading && questions.length === 0 ? (
                        <p className="title-3 text-center">
                            {location === 'sent' ? 'You have not sent any questions yet.' : 'Follow someone to see their questions here.'}
                        </p>
                    ) : (
                        questions.map((question) => (
                            <QuestionCard
                                key={`questions-${question._id}`}
                                question={question}
                            />
                        ))
                    )
                ) : (
                    !isLoading && inbox.length === 0 ? (
                        <p className="title-3 text-center">
                            You have no questions in your inbox.
                        </p>
                    ) : (
                        inbox.map((question) => (
                            <QuestionCard
                                key={`inbox-${question._id}`}
                                question={question}
                                isOpen={true}
                            />
                        ))
                    )
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