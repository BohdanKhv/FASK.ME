import { useSelector, useDispatch } from 'react-redux';
import { IsUserGate, FollowToggle, FollowList, Ask, DisplayImage, EditProfile, CreateFAQ, Tooltip, ProfileNotFound } from '../';
import { logout } from '../../features/auth/authSlice';
import { doorClosedIcon } from '../../constance/icons';
import './styles/Profile.css';


const Profile = () => {
    const dispatch = useDispatch();
    const { profile, isLoading, isFollowLoading } = useSelector(state => state.profile);

    return (
        <section className="profile">
            <ProfileNotFound />
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
                            <div className="action-left">
                            </div>
                            <div className="action-right">
                                <IsUserGate>
                                    <Tooltip
                                        content="Log out"
                                    >
                                        <div 
                                            className="btn-icon"
                                            onClick={() => dispatch(logout())}
                                        >
                                            {doorClosedIcon}
                                        </div>
                                    </Tooltip>
                                </IsUserGate>
                                <FollowToggle/>
                            </div>
                        </div>
                        <div className="profile-info-content container">
                            <div className="profile-username flex align-center text-center">
                                @{profile.username}
                            </div>
                            <div className="profile-fullname flex align-center text-center mt-3 text-secondary">
                                {profile.fullName}
                            </div>
                            <div className="flex align-center mt-3">
                                <FollowList
                                    label="Followers"
                                />
                                <FollowList
                                    label="Following"
                                />
                            </div>
                            {profile.bio && (
                                <div className="profile-bio flex align-center text-center mt-1 text-secondary">
                                    {profile.bio}
                                </div>
                            )}
                            <div className="profile-actions flex align-center">
                                <IsUserGate>
                                    <EditProfile/>
                                    <CreateFAQ/>
                                </IsUserGate>
                                <Ask/>
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