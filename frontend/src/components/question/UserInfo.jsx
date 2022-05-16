import { Link } from 'react-router-dom';
import { Image } from '../';
import { anonymousIcon } from '../../constance/icons';

const UserInfo = ({ profile, secondary }) => {
    return (
        <>
            <div className="user-info-sender flex flex-align-center">
                {profile && profile !== 'Anonymous' ? (
                <>
                    { profile.avatar ? (
                        <Image
                            image={ profile.avatar }
                            alt="Avatar"
                            classList="profile-image-sm"
                        />
                    ) : (
                        <div className="profile-image-placeholder profile-image-placeholder-sm">
                            {profile.username[0].toUpperCase()}
                        </div>
                    ) }
                    <div>
                        <Link to={`/${profile.username}`} className="user-info-name text-hover">
                            {profile.username}
                        </Link>
                        <div className="status text-xs text-secondary">
                            {secondary}
                        </div>
                    </div>
                </>
                ) : profile === 'Anonymous' && (
                    <>
                    <div className="profile-image-placeholder profile-image-placeholder-sm">
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