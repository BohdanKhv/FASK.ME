import { useSelector, useDispatch } from 'react-redux';
import { doorClosedIcon, arrowRepeatIcon } from '../../constance/icons';
import { followToggleProfile } from '../../features/profile/profileSlice';
import { AuthGate } from '../';


const FollowToggle = () => {
    const dispatch = useDispatch();
    const { profile, isFollowLoading } = useSelector(state => state.profile);
    const { user } = useSelector(state => state.auth);


    const handleFollow = () => {
        dispatch(followToggleProfile(profile._id));
    }

    return (
        <>
        <AuthGate>
            {user && (
                <div 
                    className="btn btn-xs btn-primary spinner"
                    onClick={!isFollowLoading ? handleFollow : null}
                >
                    {isFollowLoading ? (
                        arrowRepeatIcon
                    ) : (
                        profile.followers.includes(user._id) ? (
                            'Unfollow'
                        ) : (
                            'Follow'
                        )
                    )}
                </div>
            )}
        </AuthGate>
        </>
    )
}

export default FollowToggle