import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { faqIcon, askedIcon, anonymousIcon, answeredIcon, doorOpenIcon, downArrow } from '../constance/icons';
import { Input } from '../components';
import './styles/Main.css';
import { group1, group2, group3, group4, group5 } from '../constance/main/images';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebase';


const Main = () => {
    const [username, setUsername] = useState('');


    useEffect(() => {
        document.title = 'Fask.me - Main | All of your questions and answeres in one place';
        
        document.body.scrollTo(0, 0);
    }, []);

    return (
        <section className="main-page">
            <div className="container">
                <div className="header">
                    <h1 className="title-1 mb-xl">
                        The Last Time You'll Ever Need to Answer Questions Again
                    </h1>
                    <p className="title-3 mb-l">
                        Create an FAQs and you never have to worry about answering the same question again
                    </p>
                    <p className="mb-l">
                        <span className="text-secondary">Already on Fask.me?</span> <Link className="text-hover" to="/login">Login</Link>
                    </p>
                    <div className="flex align-center mb-xl">
                        <Link 
                            to="/register" 
                            className="btn btn-primary"
                            onClick={() => logEvent(analytics, 'register_click')}
                        >
                            GET STARTED FOR FREE
                        </Link>
                    </div>
                </div>
                <div className="brief container">
                    <div className="mobile-frame-container">
                        <div className="mobile-frame">
                            <div className="content">
                                <div className="content-wrapper">
                                    <div className="flex mb-l">
                                        <div className="p-img mr-1"/>
                                        <div
                                            className="title-2 text-nowrap"
                                            onClick={() => {
                                                document.querySelector('input[name="username"]').scrollIntoView({
                                                    behavior: 'smooth',
                                                    block: 'center',
                                                    });
                                                document.querySelector('input[name="username"]').focus();
                                            }}
                                        >{username.length === 0 ? 'Your Username' : username}</div>
                                    </div>
                                    <div className="flex little-nav align-center pt-1 mb-1">
                                        <div className="flex-grow text-center flex flex-column align-center">{faqIcon } <span>FAQs</span></div>
                                        <div className="flex-grow text-center flex flex-column align-center">{answeredIcon} <span>Answered</span></div>
                                        <div className="flex-grow text-center flex flex-column align-center">{askedIcon} <span>Asked</span></div>
                                    </div>
                                    <div className="flex flex-column">
                                        <div className="qa-placeholder">
                                            <div className="q-placeholder flex p-1">Q | <div className="plch ml-1 w-75"/></div>
                                            <div className="a-placeholder flex border-top p-1">A | <div className="plch ml-1 w-50"/></div>
                                        </div>
                                        <div className="qa-placeholder">
                                            <div className="q-placeholder flex p-1">Q | <div className="plch ml-1 w-75"/></div>
                                            <div className="a-placeholder flex border-top p-1">A | <div className="plch ml-1 w-25"/></div>
                                        </div>
                                        <div className="qa-placeholder">
                                            <div className="q-placeholder flex p-1">Q | <div className="plch ml-1 w-25"/></div>
                                            <div className="a-placeholder flex border-top p-1">A | <div className="plch ml-1 w-50"/></div>
                                        </div>
                                        <div className="qa-placeholder">
                                            <div className="q-placeholder flex p-1">Q | <div className="plch ml-1 w-50"/></div>
                                            <div className="a-placeholder flex border-top p-1">A | <div className="plch ml-1 w-25"/></div>
                                        </div>
                                        <div className="qa-placeholder">
                                            <div className="q-placeholder flex p-1">Q | <div className="plch ml-1 w-50"/></div>
                                            <div className="a-placeholder flex border-top p-1">A | <div className="plch ml-1 w-25"/></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="line"/>
                    <div className="flex sign-up">
                        <Input
                            type="text"
                            name="username"
                            label="Your Username"
                            bodyStyle={{
                                flexGrow: 1,
                            }}
                            inputStyle={{
                                maxHeight: '61px',
                            }}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        >
                            fask.me/
                        </Input>
                        {username.length > 2 && (
                            <Link 
                                to={`/register?username=${username}`} 
                                className="btn-icon btn-icon-outline ml-1"
                                onClick={() => logEvent(analytics, 'register_click')}
                            >
                                {downArrow}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            <div className="features">
                <div className="container">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="title-1 mb-1">
                                Don't answer the same question again
                            </h2>
                            <p className="title-3">
                                Create FAQs and you'll never have to worry about answering the same questions ever again.
                            </p>
                        </div>
                        <div className="card-img">
                            <img src={group1} alt="Don't answer the same question again" />
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-img">
                            <img src={group2} alt="Use it anywhere" />
                        </div>
                        <div className="card-body">
                            <h2 className="title-1 mb-1">
                                Use it anywhere
                            </h2>
                            <p className="title-3">
                                Share your Fask.me profile wherever your audience is, to help them to know you better. No headers, no footers, no ads, no distractions.
                            </p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h2 className="title-1 mb-1">
                                Ask & answer
                            </h2>
                            <p className="title-3">
                                Ask questions and answer them. They will be attached to your profile and your audience will be able to see them.
                            </p>
                        </div>
                        <div className="card-img">
                            <img src={group3} alt="Use it anywhere" />
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-img">
                            <img src={group4} alt="Use it anywhere" />
                        </div>
                        <div className="card-body">
                            <h2 className="title-1 mb-1">
                                Ask anonymously
                            </h2>
                            <p className="title-3">
                                Don't have to worry about your identity. Ask anonymously.
                            </p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h2 className="title-1 mb-1">
                                No more spam
                            </h2>
                            <p className="title-3">
                                We have a one question limit. Sender can only ask once untill it's answered or deleted.
                            </p>
                        </div>
                        <div className="card-img">
                            <img src={group5} alt="Use it anywhere" />
                        </div>
                    </div>
                </div>
                <div className="footer w-100 w-max">
                    <div className="title-1 mb-l">
                        Join Fask.me today
                    </div>
                    <div className="flex align-center mb-xl">
                        <Link 
                            to="/register" className="btn btn-primary"
                            onClick={() => logEvent(analytics, 'register_click')}
                        >
                            GET STARTED FOR FREE
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Main