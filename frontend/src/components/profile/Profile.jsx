import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IsUserGate, AuthGate, FollowToggle, FollowList, Ask, DisplayImage, Premium, CreateFAQ, ProfileNotFound, ProfileMenu, LinksMenu } from '../';
import { bgColor } from '../../constance/userMiddleware';
import './styles/Profile.css';


const Profile = () => {
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
            {!isLoading && profile && (
                <>
                <div className="profile-info">
                    <div className={`profile-info-container flex${isDesktop ? ' mb-xl' : ' mb-1'}`}>
                        <div className={`avatar mx-auto ${bgColor(profile.username)}`}>
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
                                    <LinksMenu />
                                    <FollowToggle />
                                    <IsUserGate>
                                        <ProfileMenu />
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
                    <div className="my-1">
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
                            {profile.premium > 0 && (
                                <Premium/>
                            )}
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
                </>
            )}
            {isLoading && (
                <>
                <div className="profile-info blink border-bottom">
                    <div className="flex mb-xl">
                        <div className="flex-grow">
                            <div className="profile-image flex align-center mx-auto">
                                <div className="avatar"/>
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
        </section>
    )
}

export default Profile