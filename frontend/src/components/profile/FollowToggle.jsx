import { useSelector, useDispatch } from 'react-redux';
import { doorClosedIcon, arrowRepeatIcon } from '../../constance/icons';
import { followToggleProfile } from '../../features/auth/authSlice';


const FollowToggle = ({profile, isList}) => {
    const dispatch = useDispatch();
    const { isFollowLoading } = useSelector(state => state.auth);
    const curProfile = useSelector(state => state.profile.profile);
    const { user } = useSelector(state => state.auth);


    const handleFollow = () => {
        dispatch(followToggleProfile(profile._id));
    }

    return (
        user && profile &&
        (isList || ( !isList && curProfile.user._id !== user._id )) && (
            <div 
                className={`btn btn-sm spinner${!user.profile.following.includes(profile.user._id || profile.user) ? ' btn-primary' : ''}`}
                onClick={!isFollowLoading ? handleFollow : null}
            >
                {isFollowLoading ? (
                    arrowRepeatIcon
                ) : (
                    user.profile.following.includes(profile.user._id || profile.user) ? (
                        'Unfollow'
                    ) : (
                        'Follow'
                    )
                )}
            </div>
        )
    )
}

export default FollowToggle