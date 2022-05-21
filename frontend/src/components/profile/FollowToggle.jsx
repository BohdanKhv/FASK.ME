import { useSelector, useDispatch } from 'react-redux';
import { followUser } from '../../features/follow/followSlice';
import { arrowRepeatIcon } from '../../constance/icons';


const FollowToggle = ({follow}) => {
    const dispatch = useDispatch();
    const { isLoading, loadingId } = useSelector(state => state.follow);
    const { profile } = useSelector(state => state.profile);
    const { user } = useSelector(state => state.auth);


    const handleFollow = () => {
        dispatch(followUser(follow ? follow._id : profile.user._id));
    }

    return (
        user && 
        ((follow && follow._id !== user._id) ||
        (!follow && user && profile && (user._id !== profile.user._id))) && (
            <>
            {(follow && follow.canFollow) || (!follow && profile.canFollow) ? (
                <div 
                    className={`btn btn-sm spinner btn-primary`}
                    onClick={!isLoading ? handleFollow : null}
                >
                    {loadingId && (follow && (loadingId === follow._id)) || (loadingId === profile.user._id) ? (
                        arrowRepeatIcon
                    ) : (
                        'Follow'
                    )}
                </div>
            ) : (
                <div 
                    className={`btn btn-sm spinner`}
                    onClick={!isLoading ? handleFollow : null}
                >
                    {loadingId && (follow && (loadingId === follow._id)) || (loadingId === profile.user._id) ? (
                        arrowRepeatIcon
                    ) : (
                        'Unfollow'
                    )}
                </div>
            )}
            </>
        )
    )
}

export default FollowToggle