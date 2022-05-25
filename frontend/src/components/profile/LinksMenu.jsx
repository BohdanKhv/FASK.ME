import { useState } from 'react';
import { useSelector } from 'react-redux'
import { closeIcon, linkIcon } from "../../constance/icons"
import { Modal } from '../';
import { trimLink } from '../../constance/trimLink';


const LinksMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { profile } = useSelector(state => state.profile);

    return (
        <>
        <Modal
            setModalIsOpen={setIsOpen}
            modalIsOpen={isOpen}
            headerNone
            footerNone
        >
            {profile.links.map((link, index) => (
                <a key={`links-link-${index}`} href={link} target="_blank" className="btn mb-1">
                    {trimLink(link)}<span>{link.replace(/^(http(s)?:\/\/)?(www\.)?/i, '').split('/')[0].split('.')[0]}</span>
                </a>
            ))}
            <div 
                className="btn"
                onClick={() => setIsOpen(false)}
            >
                {closeIcon}<span>Close</span>
            </div>
        </Modal>
        <div 
            className="btn-icon mr-1"
            onClick={() => setIsOpen(true)}
        >
            {linkIcon}
        </div>
        </>
    )
}

export default LinksMenu