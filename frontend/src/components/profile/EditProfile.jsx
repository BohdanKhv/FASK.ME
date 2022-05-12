import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Input, UploadImage } from '../';
import { updateProfile } from '../../features/profile/profileSlice';
import './styles/EditProfile.css';

const EditProfile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const { profile } = useSelector((state) => state.profile);

    const [editProfile, setEditProfile] = useState({
        fullName: profile.fullName || '',
        bio: profile.bio || '',
    });
    const [links, setLinks] = useState([
        profile.links,
        '',
    ]);

    const uploadImage = (label, url) => {
        if(label === 'Avatar') {
            return dispatch(updateProfile({
                avatar: url
            }));
        }

        if(label === 'Cover') {
            return dispatch(updateProfile({
                cover: url
            }));
        }
    }

    const saveProfile = () => {
        const { fullName, bio } = editProfile;
        dispatch(updateProfile({
            fullName,
            bio,
        }));
        setIsOpen(false);
    }

    return (
        <div className="edit-profile">
            <Modal
                modalIsOpen={isOpen}
                setModalIsOpen={setIsOpen}
                contentLabel="Edit Profile"
                actionDangerBtnText="Cancel"
                actionBtnText="Save"
                onSubmit={saveProfile}
                onSubmitDanger={() => { setIsOpen(false) }}
            >
                <div className="flex align-between">
                    <div>
                        <div className="edit-avatar">
                            <UploadImage
                                image={profile.avatar}
                                label="Avatar"
                                folder="avatars"
                                fileName={`${profile.username}-avatar`}
                                containerClass="edit-avatar"
                                imageClass="edit-avatar-image"
                                updateData={uploadImage}
                            />
                        </div>
                        <p className="title-4 px-1 pb-1 text-center">
                            Avatar
                        </p>
                    </div>
                    <div className="flex-grow ml-1">
                        <UploadImage
                            image={profile.cover}
                            label="Cover"
                            folder="covers"
                            fileName={`${profile.username}-cover`}
                            containerClass="edit-cover"
                            imageClass="edit-cover-image"
                            updateData={uploadImage}
                        />
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