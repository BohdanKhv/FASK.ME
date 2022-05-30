import { Link } from 'react-router-dom';
import { Image } from '../';
import { bgColor } from '../../constance/userMiddleware';

const UserInfo = ({ profile, secondary }) => {
    return (
        <>
            <div className="flex flex-align-center min-width-0">
                {profile && profile !== 'Anonymous' ? (
                <>
                    { profile.avatar ? (
                        <Image
                            image={ profile.avatar }
                            alt="Avatar"
                            classList="profile-image-sm"
                        />
                    ) : (
                        <div className={`avatar avatar-sm ${bgColor(profile.username)}`}>
                            {profile.username[0].toUpperCase()}
                        </div>
                    ) }
                    <div className="overflow-hidden">
                        <Link to={`/${profile.username}`} className="user-info-name text-hover text-nowrap">
                            {profile.username}
                        </Link>
                        <div className="status text-xs text-secondary">
                            {secondary}
                        </div>
                    </div>
                </>
                ) : profile === 'Anonymous' && (
                    <>
                    <div className={`avatar avatar-sm ${bgColor('Anonymous')}`}>
                        A
                    </div>
                    <div>
                        <div className="user-info-name">
                            Anonymous
                        </div>
                        <div className="status text-xs text-secondary">
                            {secondary}
                        </div>
                    </div>
                    </>
                )}
            </div>
        </>
    )
}

export default UserInfo