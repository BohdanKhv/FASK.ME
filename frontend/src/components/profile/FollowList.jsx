import { useEffect, useState, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { getFollowers, getFollowing, reset } from '../../features/follow/followSlice';
import { Modal, Image, FollowToggle } from '../';
import { logEvent } from 'firebase/analytics';
import { bgColor } from "../../constance/userMiddleware";
import { analytics } from '../../firebase';


const Following = ({label, setIsOpen}) => {
    const { followList, isLoading, numFound, skip } = useSelector((state) => state.follow);
    const { profile } = useSelector((state) => state.profile);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const location = useLocation();

    const getData = () => {
        if (label === 'followers' && profile.followers && profile.followers > 0) {
            logEvent(analytics, 'followers', {
                user_id: user ? user._id : null,
                user_username: user ? user.username : null,
                viewed_user_id: profile.user._id,
                viewed_user_id: profile.username,
            });

            return dispatch(getFollowers(profile.user._id));
        } else if (label === 'following' && profile.following && profile.following > 0) {
            logEvent(analytics, 'following', {
                user_id: user ? user._id : null,
                user_username: user ? user.username : null,
                viewed_user_id: profile.user._id,
                viewed_user_id: profile.username,
            });

            return dispatch(getFollowing(profile.user._id));
        } else {
            return;
        }
    }

    const observer = useRef();
    const lastElementRef = useCallback(node => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && skip < numFound) {
                const promise = getData();

                return () => {
                    promise && promise.abort();
                    dispatch(reset());
                }
            }
        });
        if (node) observer.current.observe(node);
    }, [skip, numFound, getData]);

    useEffect(() => {
        const promiser = getData();

        return () => {
            promiser && promiser.abort();
            setIsOpen(false);
            dispatch(reset());
        }
    }, [location])

    return (
        <>
            <Modal
                modalIsOpen={true}
                setModalIsOpen={setIsOpen}
                contentLabel={label}
                isLoading={isLoading}
                notCloseOnUpdate={true}
                isScroll={true}
            >
                <div className="follows-list">
                    {followList.map((follow, index) => (
                        <div ref={(followList.length === index + 1) ? lastElementRef : null} className="flex align-between align-center mb-1 flex-align-center" key={`follows-${follow._id}`}>
                            <div className="flex flex-align-center">
                                <Link to={`/${follow.username}`}>
                                    {follow.profile.avatar ? (
                                        <Image
                                            image={follow.profile.avatar}
                                            alt="Avatar"
                                            classList="profile-image-md"
                                        /> 
                                    ) : (
                                        <div className={`avatar avatar-md ${bgColor(profile.username)}`}>
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
                            {label === 'following' && profile && profile.following === 0 ? (
                                `${profile.username} is not following anyone`
                            ) : label === 'followers' && profile && profile.followers === 0 && (
                                `${profile.username} has no followers`
                            )}
                        </div>
                    )}
                </div>
            </Modal>
        </>
    )
}

export default Following