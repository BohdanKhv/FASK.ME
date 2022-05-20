import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { 
    getProfileFaqQuestions,
    getProfileAnsweredQuestions,
    getProfileAskedQuestions,
    getUserPrivateQuestions,
    reset 
} from '../../features/question/questionSlice';
import { QuestionCard, Navbar } from '../';
import { faqIcon, answeredIcon, askedIcon, lockIcon, arrowRepeatIcon } from '../../constance/icons';
import './styles/Questions.css';


const Questions = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation().pathname.split('/')[2];
    const { username } = useParams();
    const user = useSelector((state) => state.auth.user);
    const { profile } = useSelector((state) => state.profile);
    const { questions, skip, limit, isLoading } = useSelector(state => state.question);
    const [profileNavLinks, setProfileNavLinks] = useState([])


    useEffect(() => {
        let promise = null;
        if(!location) {
            promise = dispatch(getProfileFaqQuestions({
                username: profile.username,
                skip,
                limit
            }));
        } else if (location === 'private') {
            if(user && (user.username === profile.username)) {
                promise = dispatch(getUserPrivateQuestions());
            } else {
                navigate(`/${profile.username}`);
            }
        } else if (location === 'answered') {
            promise = dispatch(getProfileAnsweredQuestions({
                username: profile.username,
                skip,
                limit
            }));
        } else if (location === 'asked') {
            promise = dispatch(getProfileAskedQuestions({
                username: profile.username,
                skip,
                limit
            }));
        }

        return () => {
            promise && promise.abort();
            dispatch(reset());
        }
    }, [location]);

    useEffect(() => {
        if(user && (profile.username === user.username)) {
            return setProfileNavLinks([
                {
                    name: 'FAQ',
                    icon: faqIcon,
                    path: `/${profile.username}`,
                },
                {
                    name: 'Answered',
                    icon: answeredIcon,
                    path: `/${profile.username}/answered`,
                },
                {
                    name: 'Asked',
                    icon: askedIcon,
                    path: `/${profile.username}/asked`,
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
                },
                {
                    name: 'Answered',
                    icon: answeredIcon,
                    path: `/${profile.username}/answered`,
                },
                {
                    name: 'Asked',
                    icon: askedIcon,
                    path: `/${profile.username}/asked`,
                },
            ]);
        }
    }, [profile]);

    useEffect(() => {
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
                {questions.map((question, index) => (
                    <QuestionCard key={`privatelyHidden-${question._id+index}`} question={question} />
                ))}
                {!isLoading && questions.length === 0 && (
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
                    <div className="flex align-center mb-1">
                        <div className="btn-icon spinner">{arrowRepeatIcon}</div>
                    </div>
                }
            </div>
        </section>
    )
}

export default Questions