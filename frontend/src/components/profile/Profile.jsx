import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IsUserGate, AuthGate, FollowToggle, FollowList, Ask, DisplayImage, EditProfile, CreateFAQ, Tooltip, ProfileNotFound } from '../';
import { logout } from '../../features/auth/authSlice';
import { doorClosedIcon } from '../../constance/icons';
import './styles/Profile.css';


const Profile = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenFollowingList, setIsOpenFollowingList] = useState(false);
    const [isOpenFollowersList, setIsOpenFollowersList] = useState(false);
    const [isDesktop, setDesktop] = useState(window.innerWidth > 735);
    const { profile, isLoading } = useSelector(state => state.profile);

    const updateMedia = () => {
        setDesktop(window.innerWidth > 735);
    };

    useEffect(() => {
        window.addEventListener("resize", updateMedia);

        return () => {
            window.removeEventListener("resize", updateMedia);
        };
    }, []);

    return (
        <section className="profile">
            <ProfileNotFound />
            <div className="container">
                {!isLoading && profile && (
                    <>
                    <div className="profile-info">
                        <div className={`profile-info-container flex${isDesktop ? ' mb-xl' : ' mb-1'}`}>
                            <div className="profile-image-placeholder mx-auto">
                                { profile.avatar ? (
                                    <DisplayImage
                                        image={ profile.avatar }
                                        alt="Avatar"
                                        classList="profile-image"
                                    />
                                ) : (
                                    profile.username[0].toUpperCase()
                                ) }
                            </div>
                            <div className="flex-grow-2 flex-shrink-1 flex-basis-0">
                                <div className="profile-header flex flex-align-center mb-1">
                                    {isDesktop && (
                                        <h2 className="title-1 flex-grow text-nowrap">
                                            {profile.username}
                                        </h2>
                                    )}
                                    <div className="flex flex-align-center">
                                        <FollowToggle />
                                        <IsUserGate>
                                            <div className="mr-1">
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
                                            </div>
                                        </IsUserGate>
                                        <IsUserGate>
                                            <div 
                                                className="btn btn-outline text-nowrap btn-sm"
                                                onClick={() => setIsOpen(true)}
                                            >
                                                Edit Profile
                                            </div>
                                        </IsUserGate>
                                    </div>
                                </div>
                                {isDesktop && (
                                    <div className={`flex${isDesktop ? ' mb-1' : ''}`}>
                                        <div 
                                            className="btn btn-xs mr-1"
                                            onClick={() => setIsOpenFollowingList(true)}
                                        >
                                            {profile.following || 0} Following
                                        </div>
                                        <div 
                                            className="btn btn-xs mr-1"
                                            onClick={() => setIsOpenFollowersList(true)}
                                        >
                                            {profile.followers || 0} Followers
                                        </div>
                                    </div>
                                )}
                                {isDesktop && (
                                <>
                                <h5 className="title-4">
                                    {profile.fullName}
                                </h5>
                                <div className="text-secondary">
                                    {profile.bio}
                                </div>
                                </>
                                )}
                            </div>
                        </div>
                        {!isDesktop && (
                        <div className="mb-1">
                            <h2 className="title-1 flex-grow text-nowrap">
                                {profile.username}
                            </h2>
                            <h5 className="title-4 text-secondary mb-1">
                                {profile.fullName}
                            </h5>
                            <div className="text-secondary">
                                {profile.bio}
                            </div>
                        </div>
                        )}
                        {!isDesktop && (
                            <div className="flex mb-1">
                                <div 
                                    className="btn btn-xs mr-1"
                                    onClick={() => setIsOpenFollowingList(true)}
                                >
                                    {profile.following || 0} Following
                                </div>
                                <div 
                                    className="btn btn-xs mr-1"
                                    onClick={() => setIsOpenFollowersList(true)}
                                >
                                    {profile.followers || 0} Followers
                                </div>
                            </div>
                        )}
                        <IsUserGate>
                            <div className={`flex py-1${isDesktop ? ' flex-end' : ' border-top'}`}>
                                <CreateFAQ
                                    classList={`${!isDesktop ? 'flex-grow' : ''}`}
                                />
                            </div>
                        </IsUserGate>
                        <AuthGate>
                            <div className={`flex py-1${isDesktop ? ' flex-end' : ' border-top'}`}>
                                <Ask
                                    classList={`${!isDesktop ? 'flex-grow' : ''}`}
                                />
                            </div>
                        </AuthGate>
                    </div>
                    {isOpenFollowingList && (
                        <FollowList
                            label="following"
                            setIsOpen={setIsOpenFollowingList}
                        />
                    )}
                    {isOpenFollowersList && (
                        <FollowList
                            label="followers"
                            setIsOpen={setIsOpenFollowersList}
                        />
                    )}
                    <IsUserGate>
                        <EditProfile
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                        />
                    </IsUserGate>
                    </>
                )}
                {isLoading && (
                    <>
                    <div className="profile-info blink border-bottom">
                        <div className="flex mb-xl">
                            <div className="flex-grow">
                                <div className="profile-image flex align-center mx-auto">
                                    <div className="profile-image-placeholder"/>
                                </div>
                            </div>
                            <div className="flex-grow-2">
                                <div className="username blink mb-1"/>
                                <div className="username blink w-25 mb-1"/>
                                <div className="username blink w-50 mb-1"/>
                                <div className="username blink w-75 mb-1"/>
                            </div>
                        </div>
                    </div>
                    <div className="username blink mb-1 my-1"/>
                    <div className="username blink mb-1 my-1"/>
                    </>
                )}
            </div>
        </section>
    )
}

export default Profile