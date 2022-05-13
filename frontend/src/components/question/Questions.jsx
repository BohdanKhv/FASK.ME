import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { 
    getProfileFaqQuestions,
    getProfileAnsweredQuestions,
    getProfileAskedQuestions,
    getUserPrivateQuestions,
    getProfileQuestionCount,
    reset 
} from '../../features/question/questionSlice';
import { QuestionCard, Navbar } from '../';
import { faqIcon, answeredIcon, askedIcon, lockIcon } from '../../constance/icons';
import './styles/Questions.css';


const Questions = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation().pathname.split('/')[2];
    const { username } = useParams();
    const user = useSelector((state) => state.auth.user);
    const { profile } = useSelector((state) => state.profile);
    const { faq, answered, asked, privatelyHidden, count, isLoading } = useSelector(state => state.question);
    const [profileNavLinks, setProfileNavLinks] = useState([])


    useEffect(() => {
        if(!location) {
            dispatch(getProfileFaqQuestions(profile.username));
        } else if (location === 'private') {
            if(user && (user.username === profile.username)) {
                dispatch(getUserPrivateQuestions());
            } else {
                navigate(`/${profile.username}`);
            }
        } else if (location === 'answered') {
            dispatch(getProfileAnsweredQuestions(profile.username));
        } else if (location === 'asked') {
            dispatch(getProfileAskedQuestions(profile.username));
        }
    }, [location]);

    useEffect(() => {
        if(user && (profile.username === user.username)) {
            return setProfileNavLinks([
                {
                    name: 'FAQ',
                    icon: faqIcon,
                    path: `/${profile.username}`,
                    count: count ? count.faq : 0,
                },
                {
                    name: 'Answered',
                    icon: answeredIcon,
                    path: `/${profile.username}/answered`,
                    count: count ? count.answered : 0,
                },
                {
                    name: 'Asked',
                    icon: askedIcon,
                    path: `/${profile.username}/asked`,
                    count: count ? count.asked : 0,
                },
                {
                    name: 'Private',
                    icon: lockIcon,
                    path: `/${user.username}/private`,
                }
            ]);
        } else {
            return setProfileNavLinks([
                {
                    name: 'FAQ',
                    icon: faqIcon,
                    path: `/${profile.username}`,
                    count: count ? count.faq : 0,
                },
                {
                    name: 'Answered',
                    icon: answeredIcon,
                    path: `/${profile.username}/answered`,
                    count: count ? count.answered : 0,
                },
                {
                    name: 'Asked',
                    icon: askedIcon,
                    path: `/${profile.username}/asked`,
                    count: count ? count.asked : 0,
                },
            ]);
        }
    }, [count]);

    useEffect(() => {
        dispatch(getProfileQuestionCount(profile.username));

        return () => {
            dispatch(reset());
        }
    }, []);

    return (
        <section className="container">
            <Navbar
                links={profileNavLinks}
            />
            <div className="questions">
                {location === 'private' ? (
                    <>
                        {privatelyHidden.map((question, index) => (
                            <QuestionCard key={`privatelyHidden-${question._id+index}`} question={question} />
                        ))}
                        {!isLoading && privatelyHidden.length === 0 && (
                            <p className="title-3">
                                You have no private questions.
                            </p>
                        )}
                        {isLoading && answered.length === 0 && <QuestionCard isLoading={isLoading}/>}
                    </>
                ) : location === 'answered' ? (
                    <>
                        {answered.map((question, index) => (
                            <QuestionCard key={`answered-${question._id+index}`} question={question} />
                        ))}
                        {!isLoading && answered.length === 0 && (
                            <p className="title-3">
                                {username.slice(0,1).toUpperCase()+username.slice(1)} has not answered any questions yet.
                            </p>
                        )}
                        {isLoading && answered.length === 0 && <QuestionCard isLoading={isLoading}/>}
                    </>
                ) : !location ? (
                    <>
                        {faq.map((question, index) => (
                            <QuestionCard key={`faq-${question._id+index}`} question={question} />
                        ))}
                        {!isLoading && faq.length === 0 && (
                            <p className="title-3">
                                {username.slice(0,1).toUpperCase()+username.slice(1)} has not posted any FAQ yet.
                            </p>
                        )}
                        {isLoading && faq.length === 0 && <QuestionCard isLoading={isLoading}/>}
                    </>
                ) : location === 'asked' && (
                    <>
                        {asked.map((question, index) => (
                            <QuestionCard key={`asked-${question._id+index}`} question={question} />
                        ))}
                        {!isLoading && asked.length === 0 && (
                            <p className="title-3">
                                {username.slice(0,1).toUpperCase()+username.slice(1)} has not asked any questions yet.
                            </p>
                        )}
                        {isLoading && asked.length === 0 && <QuestionCard isLoading={isLoading}/>}
                    </>
                )}
            </div>
        </section>
    )
}

export default Questions