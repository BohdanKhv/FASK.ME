import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { settingsIcon, doorClosedIcon, moonIcon, sunIcon, userIcon, closeIcon } from "../../constance/icons";
import { logout } from '../../features/auth/authSlice';
import { setTheme } from '../../features/local/localSlice';
import { Modal, EditProfile, IsUserGate } from "../";


const ProfileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenEditProfile, setIsOpenEditProfile] = useState(false);
    const { theme } = useSelector(state => state.local);
    const dispatch = useDispatch();

    return (
        <>
            <Modal
                setModalIsOpen={setIsOpen}
                modalIsOpen={isOpen}
                headerNone
                footerNone
            >
                <div 
                    className="btn mb-1"
                    onClick={() => {setIsOpenEditProfile(true); setIsOpen(false)}}
                >
                    {userIcon}<span>Edit Profile</span>
                </div>
                <div 
                    className="btn mb-1"
                    onClick={() => dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))}
                >
                    {theme === 'dark' ? moonIcon : sunIcon} <span>Theme</span>
                </div>
                <div 
                    className="btn mb-1"
                    onClick={() => dispatch(logout())}
                >
                    {doorClosedIcon} <span>Logout</span>
                </div>
                <div 
                    className="btn"
                    onClick={() => setIsOpen(false)}
                >
                    {closeIcon} <span>Close</span>
                </div>
            </Modal>
            <IsUserGate>
                <EditProfile
                    isOpen={isOpenEditProfile}
                    setIsOpen={setIsOpenEditProfile}
                />
            </IsUserGate>
            <div
                className="btn-icon"
                onClick={() => setIsOpen(true)}
            >
                {settingsIcon}
            </div>
        </>
    )
}

export default ProfileMenu