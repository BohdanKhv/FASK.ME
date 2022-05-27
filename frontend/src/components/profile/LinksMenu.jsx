import { useState } from 'react';
import { useSelector } from 'react-redux';
import { closeIcon, linkIcon, shareIcon } from "../../constance/icons";
import { Modal } from '../';
import { trimLink } from '../../constance/trimLink';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebase';


const LinksMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { profile } = useSelector(state => state.profile);
    const { user } = useSelector(state => state.auth);

    const handleShare = () => {
        const shareData = {
            title: `${profile.username}`,
            text: `Check out ${profile.username} on Fask.me`,
            url: window.location.href
        }
        navigator.share(shareData)

        logEvent(analytics, 'share_profile', {
            user_id: user ? user._id : null,
            user_username: user ? user.username : null,
            viewed_user_id: profile.user._id,
            viewed_user_username: profile.username
        });
        setIsOpen(false);
    }

    const openMenu = () => {
        setIsOpen(true);
        logEvent(analytics, 'profile_links_view', {
            user_id: user ? user._id : null,
            user_username: user ? user.username : null,
            viewed_user_id: profile.user._id,
            viewed_user_username: profile.username
        });
    }

    return (
        <>
        <Modal
            setModalIsOpen={setIsOpen}
            modalIsOpen={isOpen}
            headerNone
            footerNone
        >
            {profile.links.map((link, index) => (
                <a 
                    key={`links-link-${index}`}
                    href={link.startsWith('http') ? link : `https://${link}`} 
                    target="_blank" 
                    className="btn mb-1"
                    onClick={() => {
                        logEvent(analytics, 'profile_link_click', {
                            user_id: user ? user._id : null,
                            user_username: user ? user.username : null,
                            link_url: link,
                            viewed_user_id: profile.user._id,
                            viewed_user_username: profile.username
                        });
                    }}
                >
                    {trimLink(link)}<span>{link.replace(/^(http(s)?:\/\/)?(www\.)?/i, '').split('/')[0].split('.')[0]}</span>
                </a>
            ))}
            <div 
                className="btn mb-1"
                onClick={handleShare}
            >
                {shareIcon} <span>Share {profile.username}'s Profile</span>
            </div>
            <div 
                className="btn"
                onClick={() => setIsOpen(false)}
            >
                {closeIcon}<span>Close</span>
            </div>
        </Modal>
        <div 
            className="btn-icon mr-1"
            onClick={openMenu}
        >
            {linkIcon}
        </div>
        </>
    )
}

export default LinksMenu