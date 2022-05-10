import { useSelector } from 'react-redux';
import { AuthUserControl, AuthControl, Image, Input, EditProfile, CreateFask } from '../';
import { sentIcon } from '../../constance/icons';
import './styles/Profile.css';

const Profile = () => {
    const { profile, isLoading } = useSelector(state => state.profile);

    return (
        <section className="profile">
            {!isLoading && profile && (
            <>
            <div className="profile-cover">
                {profile.cover && (
                    <Image
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
                                <Image
                                    image={ profile.avatar }
                                    alt="Avatar"
                                    classList="profile-avatar"
                                />
                            ) : (
                                <div className="profile-image-placeholder">
                                    {profile.username[0].toUpperCase()}
                                </div>
                            ) }
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
                            <AuthUserControl>
                                <div className="profile-settings flex align-center">
                                    <EditProfile/>
                                    <CreateFask/>
                                </div>
                            </AuthUserControl>
                            <AuthControl>
                                <div className="profile-settings flex align-center">
                                    <Input 
                                        type="text"
                                        name="question"
                                        placeholder="Your question"
                                        label="Your question"
                                        bodyStyle={{
                                            width: '600px',
                                        }}
                                        inputStyle={{
                                            height: '33px',
                                            opacity: '1',
                                            padding: '0.5rem 0',
                                        }}
                                        labelStyle={{
                                            display: 'none',
                                        }}
                                    />
                                    <div className="btn btn-primary ml-1">
                                        Fask
                                    </div>
                                </div>
                            </AuthControl>
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