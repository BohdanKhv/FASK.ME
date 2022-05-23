import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { settingsIcon, doorClosedIcon, moonIcon, sunIcon } from "../../constance/icons";
import { Modal, ThemeToggle } from "../";
import { logout } from '../../features/auth/authSlice';
import { setTheme } from '../../features/local/localSlice';


const ProfileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
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
                    onClick={() => dispatch(logout())}
                >
                    <span className="mr-1">{doorClosedIcon}</span> Logout
                </div>
                <div 
                    className="btn mb-1"
                    onClick={() => dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))}
                >
                    <span className="mr-1">{theme === 'dark' ? moonIcon : sunIcon}</span> Theme
                </div>
                <div 
                    className="btn"
                    onClick={() => setIsOpen(false)}
                >
                    Close
                </div>
            </Modal>
            <div
                className="btn-icon mr-1"
                onClick={() => setIsOpen(true)}
            >
                {settingsIcon}
            </div>
        </>
    )
}

export default ProfileMenu