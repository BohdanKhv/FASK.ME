import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Input, Textarea, UploadImage } from '../';
import { storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateProfile, updateProfileImage, updateProfileImageFinished } from '../../features/profile/profileSlice';
import './styles/EditProfile.css';

const EditProfile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const { profile, isUpdating, isError, msg } = useSelector((state) => state.profile);

    const [editProfile, setEditProfile] = useState({
        fullName: profile.fullName || '',
        bio: profile.bio || '',
    });
    const [avatarProfile, setAvatarProfile] = useState('null');
    const [coverProfile, setCoverProfile] = useState('null');
    const [avatar, setAvatar] = useState(null);
    const [cover, setCover] = useState(null);
    const [coverProgress, setCoverProgress] = useState(0);
    const [avatarProgress, setAvatarProgress] = useState(0);

    const [links, setLinks] = useState([
        profile.links,
        '',
    ]);

    const uploadImageToFirebase = (file, label, folder, fileName, maxWidth, maxHeight) => {
        const storageRef = ref(storage, `${folder}/${fileName}`);
        const metadata = {
            contentType: 'image/jpeg',
        };

        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        uploadTask.on('state_changed', 
            (snapshot) => {
                const newProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                if(label === 'avatar') {
                    setAvatarProgress(newProgress);
                } else {
                    setCoverProgress(newProgress);
                }
            }, 
            (error) => {
                console.log(error);
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    if(label === 'avatar') {
                        setAvatarProfile(downloadURL);
                    } else {
                        setCoverProfile(downloadURL);
                    }
                });
            }
        );
    }

    const saveProfile = () => {
        dispatch(updateProfileImage());
        if (avatar) {
            uploadImageToFirebase(avatar, 'avatar', 'avatars', profile.username+'_avatar');
        }
        if (cover) {
            uploadImageToFirebase(cover, 'cover', 'covers', profile.username+'_cover');
        }
        if (!avatar && !cover && (profile.fullName !== editProfile.fullName || profile.bio !== editProfile.bio)) {
            dispatch(updateProfile(editProfile));
        }
    }

    useEffect(() => {
        if(
            (!coverProfile && !cover && avatarProfile && avatar) || 
            (!avatarProfile && !avatar && coverProfile && cover) || 
            (avatarProfile && coverProfile && cover && avatar)
        ) {
            const data = {
                avatar: avatarProfile ? avatarProfile : profile.avatar,
                cover: coverProfile ? coverProfile : profile.cover,
            }
            dispatch(updateProfile(data)).then(() => {
                setIsOpen(false);
            });
        } 
    }, [avatarProfile, coverProfile]);

    // reset state
    useEffect(() => {
        if(!isOpen) {
            setEditProfile({
                fullName: profile.fullName || '',
                bio: profile.bio || '',
            });
            setAvatarProfile('');
            setCoverProfile('');
            setAvatar(null);
            setCover(null);
            setAvatarProgress(0);
            setCoverProgress(0);
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
                isLoading={isUpdating || avatarProgress > 0 || coverProgress > 0}
                onSubmitDanger={() => { setIsOpen(false) }}
                isError={isError}
                errMsg={msg}
            >
                <div className="flex align-between">
                    <div>
                        <div className="edit-avatar">
                            <UploadImage
                                image={profile.avatar}
                                fileName={`${profile.username}-avatar`}
                                containerClass="edit-avatar"
                                imageClass="edit-avatar-image"
                                setState={setAvatar}
                                state={avatar}
                                progress={avatarProgress}
                                maxWidth={400}
                            />
                        </div>
                        <p className="title-4 px-1 pb-1 text-center">
                            Avatar
                        </p>
                    </div>
                    <div className="flex-grow ml-1">
                        <UploadImage
                            image={profile.cover}
                            fileName={`${profile.username}-cover`}
                            containerClass="edit-cover"
                            imageClass="edit-cover-image"
                            setState={setCover}
                            state={cover}
                            progress={coverProgress}
                            maxWidth={1600}
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
            </Modal>
            <div 
                className="btn btn-sm"
                onClick={() => {
                    setIsOpen(true);
                }}
            >
                Edit Profile
            </div>
        </div>
    )
}

export default EditProfile