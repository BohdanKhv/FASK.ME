import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { faqIcon, inboxIcon, sentIcon } from "../constance/icons";
import { getFollowersQuestions, getSentQuestions } from '../features/question/questionSlice';
import { CreateFAQ, Navbar, QuestionCard, Tooltip } from "../components";


const Feed = () => {
    const dispatch = useDispatch()
    const location = useLocation().pathname.split("/")[1]
    const { user } = useSelector((state) => state.auth);
    const { inbox, feed, isLoading } = useSelector((state) => state.question);


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
                {!location ? (
                    feed.map((question) => (
                        <QuestionCard
                            key={`feed-${question._id}`}
                            question={question}
                        />
                    ))
                ) : location === 'sent' ? (
                    feed.map((question) => (
                        <QuestionCard
                            key={`sent-${question._id}`}
                            question={question}
                            isOpen={true}
                        />
                    ))
                ) : (
                    inbox.map((question) => (
                        <QuestionCard
                            key={`inbox-${question._id}`}
                            question={question}
                            isOpen={true}
                        />
                    ))
                )}
            </div>
        </section>
    )
}

export default Feed