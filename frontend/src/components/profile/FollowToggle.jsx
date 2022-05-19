import { useSelector, useDispatch } from 'react-redux';
import { followUser, unfollowUser } from '../../features/follow/followSlice';


const FollowToggle = ({follow}) => {
    const dispatch = useDispatch();
    const { profile, isLoading } = useSelector(state => state.follow);
    const { user } = useSelector(state => state.auth);


    const handleFollow = () => {
        dispatch(followUser(follow ? follow._id : profile._id));
    }

    const handleUnFollow = () => {
        dispatch(unfollowUser(follow ? follow._id : profile._id));
    }

    return (
        user && (
                follow ||
                (profile && (user._id !== profile._id))
            ) && (
            <>
            {(follow && follow.canFollow) || (profile.canFollow) ? (
                <div 
                    className={`btn btn-sm spinner btn-primary`}
                    onClick={!isLoading ? handleFollow : null}
                >
                    Follow
                </div>
            ) : (
                <div 
                    className={`btn btn-sm spinner`}
                    onClick={!isLoading ? handleUnFollow : null}
                >
                    Unfollow
                </div>
            )}
            </>
        )
    )
}

export default FollowToggle