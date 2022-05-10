import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Input } from '../';
import './styles/EditProfile.css'

const EditProfile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const { profile } = useSelector((state) => state.profile);

    const [editProfile, setEditProfile] = useState({
        fullName: profile.fullName || '',
        bio: profile.bio || '',
        avatar: profile.avatar || '',
        cover: profile.cover || '',
    });
    const [links, setLinks] = useState([
        profile.links,
        '',
    ]);


    return (
        <div className="edit-profile">
            <Modal
                modalIsOpen={isOpen}
                setModalIsOpen={setIsOpen}
                contentLabel="Edit Profile"
                actionDangerBtnText="Cancel"
                actionBtnText="Save"
                onSubmitDanger={() => { setIsOpen(false) }}
            >
                <div className="flex align-between">
                    <div>
                        <div className="edit-avatar">
                            {editProfile.avatar && (
                                <img src={editProfile.avatar} alt="Avatar" />
                            )}
                        </div>
                        <p className="title-4 px-1 pb-1 text-center">
                            Avatar
                        </p>
                    </div>
                    <div className="flex-grow ml-1">
                        <div className="edit-cover">
                            {editProfile.cover && (
                                <img src={editProfile.cover} alt="Cover" />
                            )}
                        </div>
                        <p className="title-4 px-1 pb-1 text-center">
                            Cover
                        </p>
                    </div>
                </div>
                <div className="edit-profile-form">
                    <div className="form-group">
                        <Input
                            type="text"
                            placeholder="Full Name"
                            label="Full Name"
                            name="fullName"
                            value={editProfile.fullName}
                            onChange={(e) => {
                                setEditProfile({
                                    ...editProfile,
                                    fullName: e.target.value,
                                });
                            }}
                        />
                    </div>
                </div>
                <div className="edit-profile-form">
                    <div className="form-group">
                        <Input
                            type="text"
                            placeholder="Bio"
                            label="Bio"
                            name="bio"
                            maxLength={100}
                            value={editProfile.bio}
                            onChange={(e) => {
                                setEditProfile({
                                    ...editProfile,
                                    bio: e.target.value,
                                });
                            }}
                        />
                    </div>
                </div>
            </Modal>
            <div 
                className="btn"
                onClick={() => setIsOpen(true)}
            >
                Edit Profile
            </div>
        </div>
    )
}

export default EditProfile