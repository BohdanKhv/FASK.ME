import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getFollowers, getFollowing, reset, addToFollowList, resetProfile } from '../../features/follow/followSlice';
import { Modal, Image, FollowToggle } from '../';

const Following = ({label, classList}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [offset, setOffset] = useState(0);
    const { profile } = useSelector((state) => state.profile);
    const { followList, isLoading } = useSelector((state) => state.follow);
    const follow = useSelector((state) => state.follow);
    const dispatch = useDispatch();

    useEffect(() => {
        if(profile) {
            dispatch(addToFollowList({
                _id: profile.user._id,
                canFollow: profile.canFollow,
                followers: profile.followers,
                following: profile.following,
            }));
        }

        return () => {
            dispatch(resetProfile());
        };
    }, [])


    useEffect(() => {
        let promise = null;
        if(isOpen) {
            if(label === 'Following') {
                if(offset < profile?.following) {
                    promise = dispatch(getFollowing(profile.user._id));
                    setOffset(offset + 10);
                }
            } else if (label === 'Followers') {
                if(offset < profile?.followers) {
                    promise = dispatch(getFollowers(profile.user._id));
                    setOffset(offset + 10);
                }
            }
        } else if ( !isOpen ) {
            setOffset(0);
            dispatch(reset());
        }

        return () => {
            promise && promise.abort();
        }

    }, [isOpen]);

    return (
        <>
            <Modal
                modalIsOpen={isOpen}
                setModalIsOpen={setIsOpen}
                contentLabel={label}
                isLoading={isLoading}
                notCloseOnUpdate={true}
                isScroll={true}
            >
                <div className="follows-list">
                    {followList.map((follow) => (
                        <div className="flex align-between align-center mb-1 flex-align-center" key={follow._id}>
                            <div className="flex flex-align-center">
                                <Link to={`/${follow.username}`}>
                                    {follow.avatar ? (
                                        <Image
                                            image={follow.avatar}
                                            alt="Avatar"
                                            classList="profile-image-md"
                                        /> 
                                    ) : (
                                        <div className="profile-image-placeholder profile-image-placeholder-md">
                                            {follow.username[0].toUpperCase()}
                                        </div>
                                    )}
                                </Link>
                                <div>
                                    <Link 
                                        to={`/${follow.username}`}
                                        className="title-4 text-hover"
                                    >
                                        {follow.username}
                                    </Link>
                                    {follow.fullName && (
                                        <p className="text-secondary mx-3">
                                            {follow.fullName}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <FollowToggle
                                follow={follow}
                            />
                        </div>
                    ))}
                    {!isLoading && (
                        <div className="text-center mb-1">
                            {label === 'Following' && follow.profile && follow.profile.following === 0 ? (
                                `${profile.username} is not following anyone`
                            ) : label === 'Followers' && follow.profile && follow.profile.followers === 0 && (
                                `${profile.username} has no followers`
                            )}
                        </div>
                    )}
                </div>
            </Modal>
            <div 
                className={`btn btn-xs${classList ? ' ' + classList : ''}`}
                onClick={() => setIsOpen(true)}
            >
            {label === 'Following' ? (
                `Following - ${follow.profile && follow.profile.following || 0}`
            ) : label === 'Followers' && (
                `Followers - ${follow.profile && follow.profile.followers || 0}`
            )}
            </div>
        </>
    )
}

export default Following