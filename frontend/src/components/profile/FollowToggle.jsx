import { useSelector, useDispatch } from 'react-redux';
import { followUser } from '../../features/follow/followSlice';


const FollowToggle = ({follow}) => {
    const dispatch = useDispatch();
    const { profile, isLoading } = useSelector(state => state.follow);
    const { user } = useSelector(state => state.auth);


    const handleFollow = () => {
        dispatch(followUser(follow ? follow._id : profile._id));
    }

    return (
        user && 
        ((follow && follow._id !== user._id) ||
        (!follow && profile && (user._id !== profile._id))) && (
            <>
            {(follow && follow.canFollow) || (!follow && profile.canFollow) ? (
                <div 
                    className={`btn btn-sm spinner btn-primary`}
                    onClick={!isLoading ? handleFollow : null}
                >
                    Follow
                </div>
            ) : (
                <div 
                    className={`btn btn-sm spinner`}
                    onClick={!isLoading ? handleFollow : null}
                >
                    Unfollow
                </div>
            )}
            </>
        )
    )
}

export default FollowToggle