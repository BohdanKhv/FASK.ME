import { useSelector } from 'react-redux';
import './styles/Profile.css';

const Profile = () => {
    const { profile, isLoading } = useSelector(state => state.profile);

    return (
        <section className="profile">
            {!isLoading && profile && (
            <>
            <div className="profile-cover">
                {profile.cover && (
                        <img src={ profile.cover } alt="Cover" />
                    )}
            </div>
            <div className="container">
                {profile && (
                    <div className="profile-info">
                        <div className="profile-image flex align-center">
                            { profile.avatar ? (
                                <img src={ profile.avatar } alt="Avatar" />
                            ) : (
                                <div className="profile-image-placeholder">
                                    {profile.username[0].toUpperCase()}
                                </div>
                            ) }
                        </div>
                        <div className="profile-info-content">
                            <div className="profile-username flex align-center text-center">
                                @{profile.username}
                            </div>
                            <div className="profile-fullname flex align-center text-center">
                                {profile.fullName}
                            </div>
                            {profile.bio && (
                                <div className="profile-bio flex align-center text-center">
                                    {profile.bio}
                                </div>
                            )}
                            <div className="profile-settings flex align-center">
                                <div className="btn">
                                    Edit Profile
                                </div>
                                <div className="btn btn-primary ml-1">
                                    Post FAQ
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            </>
            )}
            {isLoading && (
                <>
                <div className="profile-cover blink"/>
                <div className="profile-info blink">
                    <div className="profile-image flex align-center">
                        <div className="profile-image-placeholder"/>
                    </div>
                </div>
                </>
            )}
        </section>
    )
}

export default Profile