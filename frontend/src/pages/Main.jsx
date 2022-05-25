import { Link } from 'react-router-dom';
import './styles/Main.css';


const Main = () => {

    return (
        <section className="main-page">
            <div className="container">
                <div className="header">
                    <h1 className="title-1 mb-xl">
                        The Last Time You'll Ever Need to Answer Questions Again
                    </h1>
                    <p className="title-3 mb-l">
                        Create an FAQ and never have to worry about answering the same question again
                    </p>
                    <p className="mb-l">
                        <span className="text-secondary">Already on Fask.me?</span> <Link className="text-hover" to="/login">Login</Link>
                    </p>
                    <div className="flex align-center mb-xl">
                        <Link to="/register" className="btn btn-primary">
                            GET STARTED FOR FREE
                        </Link>
                    </div>
                </div>
                <div className="brief">
                    <div className="img-placeholder">
                        <img src="https://websitelinktree.gatsbyjs.io/static/device-deee8c126310b52fd50ed2fdb21ba2cd.png" alt=""/>
                    </div>
                </div>
                <div className="features">
                    <div className="card">
                        <div className="card-video">
                        <video autoPlay playsInline muted loop key="video-1">
                            <source src="https://videos.ctfassets.net/lbsm39fugycf/1i6LctbRMzKsEmWCdbZWe8/3aecc0e1dd43fa2e291e9d6778c822ee/link_to_anywhere.mp4"/>
                        </video>
                        </div>
                        <div className="card-body">
                            <h2 className="title-1 mb-1">
                                Easy To Use
                            </h2>
                            <p className="title-3">
                                Share firendly profiles. No headers, no footers, no ads, no distractions.
                            </p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h2 className="title-1 mb-1">
                                Create an FAQ
                            </h2>
                            <p className="title-3">
                                Create an FAQ and never have to worry about answering the same question again
                            </p>
                        </div>
                        <div className="card-video">
                        <video autoPlay playsInline muted loop key="video-1">
                            <source src="https://videos.ctfassets.net/lbsm39fugycf/1i6LctbRMzKsEmWCdbZWe8/3aecc0e1dd43fa2e291e9d6778c822ee/link_to_anywhere.mp4"/>
                        </video>
                        </div>
                    </div>
                    <div className="card">
                    <div className="card-video">
                        <video autoPlay playsInline muted loop key="video-1">
                            <source src="https://videos.ctfassets.net/lbsm39fugycf/1i6LctbRMzKsEmWCdbZWe8/3aecc0e1dd43fa2e291e9d6778c822ee/link_to_anywhere.mp4"/>
                        </video>
                    </div>
                    <div className="card-body">
                        <h2 className="title-1 mb-1">
                            Answere your audiences questions
                        </h2>
                        <p className="title-3">
                            Let your audience see your answers and get to know you better
                        </p>
                    </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h2 className="title-1 mb-1">
                                Ask others
                            </h2>
                            <p className="title-3">
                                Ask others and let your audience know what you were interested in.
                            </p>
                        </div>
                        <div className="card-video">
                        <video autoPlay playsInline muted loop key="video-1">
                            <source src="https://videos.ctfassets.net/lbsm39fugycf/1i6LctbRMzKsEmWCdbZWe8/3aecc0e1dd43fa2e291e9d6778c822ee/link_to_anywhere.mp4"/>
                        </video>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-video">
                        <video autoPlay playsInline muted loop key="video-1">
                            <source src="https://videos.ctfassets.net/lbsm39fugycf/1i6LctbRMzKsEmWCdbZWe8/3aecc0e1dd43fa2e291e9d6778c822ee/link_to_anywhere.mp4"/>
                        </video>
                        </div>
                        <div className="card-body">
                            <h2 className="title-1 mb-1">
                                Ask anonymously
                            </h2>
                            <p className="title-3">
                                Don't worry about being identified. Ask anonymously!
                            </p>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <div className="title-1 mb-l">
                        Join the Fask.me community today
                    </div>
                    <div className="flex align-center mb-xl">
                        <Link to="/register" className="btn btn-primary">
                            GET STARTED FOR FREE
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Main