import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { faqIcon, answeredIcon, askedIcon } from '../../constance/icons';
import './styles/QuestionNavbar.css';


const QuestionNavbar = () => {
    const { username } = useParams();
    const location = useLocation().pathname.split('/')[2];

    return (
        <div className="question-navbar">
            <Link 
                to={`/${username}`} 
                className={`question-navbar-item${!location ? ' active' : ''}`}
            >
                {faqIcon}
                FAQ
            </Link>
            <Link 
                to={`/${username}/answered`}
                className={`question-navbar-item${location === 'answered' ? ' active' : ''}`}
            >
                {answeredIcon}
                Answered
            </Link>
            <Link 
                to={`/${username}/asked`}
                className={`question-navbar-item${location === 'asked' ? ' active' : ''}`}
            >
                {askedIcon}
                Asked
            </Link>
        </div>
    )
}

export default QuestionNavbar