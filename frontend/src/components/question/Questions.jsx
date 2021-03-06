import { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { 
    getProfileFaqQuestions,
    getProfileAnsweredQuestions,
    getProfileAskedQuestions,
    getUserPrivateQuestions,
    reset 
} from '../../features/question/questionSlice';
import { QuestionCard, Navbar, Footer } from '../';
import { arrowRepeatIcon } from '../../constance/icons';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebase';
import './styles/Questions.css';

const Questions = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation().pathname.split('/')[2];
    const { username } = useParams();
    const user = useSelector((state) => state.auth.user);
    const { profile } = useSelector((state) => state.profile);
    const { questions, hasMore, isLoading, isError } = useSelector(state => state.question);

    const getData = () => {
        logEvent(analytics, 'view_profile_question', {
            user_id: user ? user._id : null,
            user_username: user ? user.username : null,
            profile_id: profile.user._id,
            profile_username: profile.username,
        });

        if(!location) {
            return dispatch(getProfileFaqQuestions(profile.username));
        } else if (location === 'private') {
            if(user && (user.username === profile.username)) {
                return dispatch(getUserPrivateQuestions());
            } else {
                navigate(`/${profile.username}`);
            }
        } else if (location === 'answered') {
            return dispatch(getProfileAnsweredQuestions(profile.username));
        } else if (location === 'asked') {
            return dispatch(getProfileAskedQuestions(profile.username));
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
        document.title = `${profile ? `${profile.fullName ? profile.fullName+' ' : ''}(@${profile.username}'s) ` : ''}Fask.me | Questions, Answers, and FAQs | ${location ? location : 'FAQs'}`;

        return () => {
            promise && promise.abort();
            dispatch(reset());
        }
    }, [location]);

    return (
        <>
        <section className="flex flex-column flex-grow w-max w-100">
            <Navbar />
            <div className="questions">
                {questions.map((question, index) => {
                    if(questions.length === index + 1) {
                        return <div ref={lastQuestionElementRef} key={`question-${question._id+index}`}><QuestionCard question={question} /></div>
                    } else {
                        return <QuestionCard key={`question-${question._id+index}`} question={question} />
                    }
                })}
                {!isLoading && !isError && questions.length === 0 && (
                    <p className="title-3 text-center">
                        {location === 'private' ? (
                            'You have no private questions.'
                        ) : location === 'answered' ? (
                            `${username} has not answered any questions yet.`
                        ) : location === 'asked' ? (
                            `${username} has not asked any questions yet.`
                        ) : !location && (
                            `${username} has not posted any FAQ yet.`
                        )}
                    </p>
                )}
                {isLoading && 
                    <div className="flex align-center mb-1 mt-1">
                        <div className="btn-icon spinner">{arrowRepeatIcon}</div>
                    </div>
                }
            </div>
        </section>
        <Footer/>
        </>
    )
}

export default Questions