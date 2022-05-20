import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getFollowers, getFollowing, reset } from '../../features/follow/followSlice';
import { Modal, Image, FollowToggle } from '../';

const Following = ({label, classList}) => {
    const [isOpen, setIsOpen] = useState(false);
    const { profile, followList, isLoading } = useSelector((state) => state.follow);
    const follow = useSelector((state) => state.follow);
    const dispatch = useDispatch();


    // useEffect(() => {
    //     let promise = null;
    //     if(isOpen) {
    //         if(label === 'Following') {
    //             if(offset < profile?.following) {
    //                 promise = dispatch(getFollowing(profile.user._id));
    //             }
    //         } else if (label === 'Followers') {
    //             if(offset < profile?.followers) {
    //                 promise = dispatch(getFollowers(profile.user._id));
    //             }
    //         }
    //     } else if ( !isOpen && followList.length > 0) {
    //         dispatch(reset());
    //     }

    //     return () => {
    //         promise && promise.abort();
    //     }

    // }, [isOpen]);

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
                `${follow.profile && follow.profile.following || 0} Following`
            ) : label === 'Followers' && (
                `${follow.profile && follow.profile.followers || 0} Followers`
            )}
            </div>
        </>
    )
}

export default Following