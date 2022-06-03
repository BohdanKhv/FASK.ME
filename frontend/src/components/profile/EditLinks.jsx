import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../features/profile/profileSlice';
import { Modal, Input } from '../';


const EditLinks = ({isOpen, setIsOpen}) => {
    const dispatch = useDispatch();
    const { profile, isUpdating, isError, msg } = useSelector((state) => state.profile);

    const [links, setLinks] = useState([
        ...profile.links,
        '',
    ]);

    const saveProfile = () => {
        if (links !== profile.links) {
            const data = {
                links: links.filter(link => link !== ''),
            }

            dispatch(updateProfile(data));
        } else {
            setIsOpen(false);
        }
    }

    // reset state
    useEffect(() => {
        if(!isOpen) {
            setLinks([...profile.links, '']);
        }
    }, [isOpen]);

    return (
        <Modal
            modalIsOpen={isOpen}
            setModalIsOpen={setIsOpen}
            contentLabel="Add up to 8 links"
            actionDangerBtnText="Cancel"
            actionBtnText="Save"
            onSubmit={!isUpdating ? saveProfile : null}
            isLoading={isUpdating}
            onSubmitDanger={() => { setIsOpen(false) }}
            isError={isError}
            errMsg={msg}
        >
            {links.map((link, index) => (
                <div className="mb-1" key={`links-${profile._id}-${index}`}>
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
    )
}

export default EditLinks