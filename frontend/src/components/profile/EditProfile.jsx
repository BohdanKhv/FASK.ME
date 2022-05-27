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

    const [links, setLinks] = useState([
        ...profile.links,
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

                setProgress(newProgress);
            }, 
            (error) => {
                console.log(error);
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    dispatch(updateProfile({
                        ...editProfile,
                        links: links.filter((link) => link !== ''),
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
        if (editProfile.fullName !== profile.fullName || editProfile.bio !== profile.bio || links !== profile.links) {
            const data = {
                ...editProfile,
                links: links.filter(link => link !== ''),
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
                                        // maxHeight: '300px',
                                        resize: 'none',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-top">
                    <p className="title-4 pt-1 px-1">
                        Add up to 8 links to your profile
                    </p>
                </div>
                {links.map((link, index) => (
                    <div className="form-group" key={`links-${profile._id}-${index}`}>
                        <Input
                            type="text"
                            placeholder="Link"
                            label="Link"
                            name="link"
                            value={link}
                            onChange={(e) => {
                                const newLinks = [...links];
                                newLinks[index] = e.target.value;
                                if(index === links.length - 1 && e.target.value !== '') {
                                    if(newLinks.length < 8) {
                                        setLinks([...newLinks, '']);
                                    } else {
                                        setLinks(newLinks);
                                    }
                                } else if(index === links.length - 2 && e.target.value === '') {
                                    setLinks(newLinks.slice(0, -1));
                                } else {
                                    setLinks(newLinks);
                                }
                            }}
                            isDisabled={isUpdating}
                        />
                    </div>
                ))}
            </Modal>
        </div>
    )
}

export default EditProfile