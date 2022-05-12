import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { getProfileFaqQuestions, getProfileAnsweredQuestions, getProfileAskedQuestions, reset } from '../../features/question/questionSlice';
import { QuestionCard, QuestionNavbar } from '../';
import './styles/Questions.css';


const Questions = () => {
    const dispatch = useDispatch();
    const { username } = useParams();
    const location = useLocation().pathname.split('/')[2];
    const { faq, answered, asked, isLoading } = useSelector(state => state.question);


    useEffect(() => {
        if(!location) {
            dispatch(getProfileFaqQuestions(username));
        } else if (location === 'answered') {
            dispatch(getProfileAnsweredQuestions(username));
        } else if (location === 'aksed') {
            dispatch(getProfileAskedQuestions(username));
        }
    }, [location]);


    useEffect(() => {
        return () => {
            dispatch(reset());
        }
    }, []);

    return (
        <section className="container">
            <QuestionNavbar/>
            <div className="questions">
                {location === 'answered' ? (
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
                                {username.slice(0,1).toUpperCase()+username.slice(1)} has not asked posted any FAQ yet.
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