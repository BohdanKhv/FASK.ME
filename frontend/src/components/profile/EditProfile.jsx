import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Input, Textarea, UploadImage, Alert } from '../';
import { updateProfile } from '../../features/profile/profileSlice';
import './styles/EditProfile.css';

const EditProfile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [err, setErr] = useState(null);
    const dispatch = useDispatch();
    const { profile, isUpdating, isError, msg } = useSelector((state) => state.profile);

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
            setIsOpen(false);
            return dispatch(updateProfile({
                avatar: url
            }));
        }

        if(label === 'Cover') {
            setIsOpen(false);
            return dispatch(updateProfile({
                cover: url
            }));
        }
    }

    useEffect(() => {
        if(!isOpen) {
            setEditProfile({
                fullName: profile.fullName || '',
                bio: profile.bio || '',
            });
        }
    }, [isOpen]);

    const saveProfile = () => {
        const { fullName, bio } = editProfile;
        dispatch(updateProfile({
            fullName,
            bio,
        }));
    }

    return (
        <div className="edit-profile">
            <Modal
                modalIsOpen={isOpen}
                setModalIsOpen={setIsOpen}
                contentLabel="Edit Profile"
                actionDangerBtnText="Cancel"
                actionBtnText="Save"
                onSubmit={!isUpdating ? saveProfile : null}
                isLoading={isUpdating}
                onSubmitDanger={() => { setIsOpen(false) }}
                isError={isError}
            >
                <Alert
                    status={'danger'}
                    message={err}
                    bodyStyle={{
                        maxHeight: '20px',
                    }}
                />
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
                                maxFileSize={3145728}
                                setErr={setErr}
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
                            maxFileSize={3145728}
                            setErr={setErr}
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
                            isDisabled={isUpdating}
                        />
                    </div>
                </div>
                <div className="edit-profile-form">
                    <div className="form-group">
                        <Textarea
                            label="Bio"
                            name="bio"
                            value={editProfile.bio}
                            onChange={(e) => {
                                setEditProfile({
                                    ...editProfile,
                                    bio: e.target.value,
                                });
                            }}
                            rows={3}
                            cols={5}
                            maxLength={200}
                            isDisabled={isUpdating}
                            inputStyle={{
                                maxHeight: '10vh'
                            }}
                        />
                    </div>
                </div>
                {isError && <div className="text-danger px-1 pt-1">{msg}</div>}
            </Modal>
            <div 
                className="btn btn-sm"
                onClick={() => {
                    setErr(null);
                    setIsOpen(true);
                }}
            >
                Edit Profile
            </div>
        </div>
    )
}

export default EditProfile