import { useSelector } from 'react-redux';
import { Link, useParams, useLocation } from 'react-router-dom';
import { faqIcon, answeredIcon, askedIcon } from '../../constance/icons';
import './styles/QuestionNavbar.css';


const QuestionNavbar = () => {
    const { username } = useParams();
    const location = useLocation().pathname.split('/')[2];
    const { count } = useSelector(state => state.profile);

    return (
        <div className="question-navbar">
            <Link 
                to={`/${username}`} 
                className={`question-navbar-item${!location ? ' active' : ''}`}
            >
                {faqIcon}
                FAQ
                <p>{count ? count.faq : 0}</p>
            </Link>
            <Link 
                to={`/${username}/answered`}
                className={`question-navbar-item${location === 'answered' ? ' active' : ''}`}
            >
                {answeredIcon}
                Answered
                <p>{count ? count.answered : 0}</p>
            </Link>
            <Link 
                to={`/${username}/asked`}
                className={`question-navbar-item${location === 'asked' ? ' active' : ''}`}
            >
                {askedIcon}
                Asked
                <p>{count ? count.asked : 0}</p>
            </Link>
        </div>
    )
}

export default QuestionNavbar