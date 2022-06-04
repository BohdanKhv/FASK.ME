import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateProfile, updateProfileImage } from '../../features/profile/profileSlice';
import { Modal, Input, Textarea, UploadImage } from '../';
import { storage } from '../../firebase';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebase';
import './styles/EditProfile.css';


const EditProfile = ({isOpen, setIsOpen}) => {
    const dispatch = useDispatch();
    const { profile, isUpdating, isError, msg } = useSelector((state) => state.profile);

    const [editProfile, setEditProfile] = useState({
        fullName: profile.fullName || '',
        bio: profile.bio || '',
    });
    const [avatar, setAvatar] = useState(null);
    const [progress, setProgress] = useState(0);

    const uploadImageToFirebase = (file, label, folder, fileName) => {
        const storageRef = ref(storage, `${folder}/${fileName}`);
        const metadata = {
            contentType: 'image/jpeg',
        };

        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        uploadTask.on('state_changed', 
            (snapshot) => {
                const newProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                setProgress(newProgress);
            }, 
            (error) => {
                console.log(error);
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const data = {
                        fullName: editProfile.fullName,
                        bio: editProfile.bio,
                    }
                    dispatch(updateProfile({
                        ...data,
                        [label]: downloadURL,
                    })).then(() => {
                        setProgress(0);
                    });
                });
            }
        );
    }

    const saveProfile = () => {
        if (avatar) {
            dispatch(updateProfileImage());
            uploadImageToFirebase(avatar, 'avatar', 'avatars', profile.username+'_avatar');
        
            logEvent(analytics, 'update_profile_image', {
                user_id: profile.user._id,
                user_username: profile.username,
            });
        }
        if (editProfile.fullName !== profile.fullName || editProfile.bio !== profile.bio) {
            const data = {
                fullName: editProfile.fullName,
                bio: editProfile.bio,
            }
            dispatch(updateProfile(data));

            logEvent(analytics, 'edit_profile', {
                user_id: profile.user._id,
                user_username: profile.username,
            });
        } else {
            setIsOpen(false);
        }
    }

    // reset state
    useEffect(() => {
        if(!isOpen) {
            setEditProfile({
                fullName: profile.fullName || '',
                bio: profile.bio || '',
            });
            setAvatar(null);
            setProgress(0);
        }
    }, [isOpen]);

    return (
        <div className="edit-profile">
            <Modal
                modalIsOpen={isOpen}
                setModalIsOpen={setIsOpen}
                contentLabel="Edit Profile"
                actionDangerBtnText="Cancel"
                actionBtnText="Save"
                onSubmit={!isUpdating ? saveProfile : null}
                isLoading={isUpdating || progress > 0}
                onSubmitDanger={() => { setIsOpen(false) }}
                isError={isError}
                errMsg={msg}
            >
                <div className="edit-profile-container flex align-between">
                    <div className="mr-1">
                        <div className="edit-avatar">
                            <UploadImage
                                image={profile.avatar}
                                fileName={`${profile.username}-avatar`}
                                containerClass="edit-avatar"
                                imageClass="edit-avatar-image"
                                setState={setAvatar}
                                state={avatar}
                                progress={progress}
                                maxWidth={400}
                            />
                        </div>
                        <p className="title-4 px-1 pb-1 text-center">
                            Avatar
                        </p>
                    </div>
                    <div className="flex-grow w-100">
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
                                        resize: 'none',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default EditProfile