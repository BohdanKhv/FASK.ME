import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoNameSvg } from '../../constance/logo';


const Footer = () => {
    const { user } = useSelector(state => state.auth);
    const { profile } = useSelector(state => state.profile);
    const { questions, numFound, isLoading } = useSelector(state => state.question);

    return (
        !user && !isLoading && profile && questions.length === numFound ? (
            <section className="footer w-100 w-max">
                <div className="flex align-center flex-column">
                    <div className="footer-text text-center mb-l">
                        <p className="title-4">
                            Do you have any questions for {profile.username}? <br />
                            <Link to='/register' className="text-hover">Sign up</Link> and ask your question.
                        </p>
                    </div>
                    <Link to='/' className="logo-lg">
                        {logoNameSvg}
                    </Link>
                </div>
            </section>
        ) : null
    )
}

export default Footer