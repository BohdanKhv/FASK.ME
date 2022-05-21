import { useEffect, useState, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { getFollowers, getFollowing, reset } from '../../features/follow/followSlice';
import { Modal, Image, FollowToggle } from '../';

const Following = ({label, setIsOpen}) => {
    const { followList, isLoading, numFound, limit, skip } = useSelector((state) => state.follow);
    const { profile } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const location = useLocation();

    const getData = () => {
        if (label === 'followers') {
            return dispatch(getFollowers({
                _id: profile.user._id,
                limit,
                skip
            }));
        } else if (label === 'following') {
            return dispatch(getFollowing({
                _id: profile.user._id,
                limit,
                skip
            }));
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
                            {label === 'Following' && profile && profile.following === 0 ? (
                                `${profile.username} is not following anyone`
                            ) : label === 'Followers' && profile && profile.followers === 0 && (
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