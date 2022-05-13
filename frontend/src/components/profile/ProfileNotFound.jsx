import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { NotFound } from '../';

const ProfileNotFound = () => {
    const { username } = useParams();
    const { user } = useSelector((state) => state.auth);
    const { isError, msg } = useSelector(state => state.profile);

    return (
            isError && msg === "Profile not found" && 
                <NotFound message={`profile not found`}>
                    {!user ? ( 
                        <div>
                            <p className="title-2 py-1">
                                <Link to="/register" className="text-hover">{username}</Link> username if free to use.
                            </p>
                            <div className="flex align-between mt-1">
                                <Link to="/register" className="btn">
                                    Log in
                                </Link>
                                <Link to="/register" className="btn btn-primary flex-grow ml-1">
                                    Register
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="flex align-between mt-1">
                                <Link to={`/`} className="btn">
                                    Home
                                </Link>
                                <Link to={`/${user.username}`} className="btn btn-primary flex-grow ml-1">
                                    Your Profile
                                </Link>
                            </div>
                        </div>
                    )}
                </NotFound>
        
    )
}

export default ProfileNotFound