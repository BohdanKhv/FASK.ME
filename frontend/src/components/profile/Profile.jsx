import { useSelector } from 'react-redux';
import { IsUserGate, Ask, DisplayImage, EditProfile, CreateFAQ, Tooltip } from '../';
import { doorClosedIcon } from '../../constance/icons';
import './styles/Profile.css';

const Profile = () => {
    const { profile, isLoading } = useSelector(state => state.profile);

    return (
        <section className="profile">
            {!isLoading && profile && (
            <>
            <div className="profile-cover">
                {profile.cover && (
                    <DisplayImage
                        image={ profile.cover }
                        alt="Cover"
                        classList="profile-cover-image"
                    />
                )}
            </div>
            <div className="container">
                {profile && (
                    <div className="profile-info">
                        <div className="profile-image flex align-center">
                            { profile.avatar ? (
                                <DisplayImage
                                    image={ profile.avatar }
                                    alt="Avatar"
                                    classList="profile-avatar"
                                />
                            ) : (
                                <div className="profile-image-placeholder">
                                    {profile.username[0].toUpperCase()}
                                </div>
                            ) }
                            <div className="log-out-btn">
                                <Tooltip
                                    content="Log out"
                                    tooltip="asd"
                                >
                                    <div className="btn-icon bg-danger">
                                        {doorClosedIcon}
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                        <div className="profile-info-content container">
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
                            <IsUserGate>
                                <div className="profile-settings flex align-center">
                                    <EditProfile/>
                                    <CreateFAQ/>
                                </div>
                            </IsUserGate>
                            <Ask/>
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