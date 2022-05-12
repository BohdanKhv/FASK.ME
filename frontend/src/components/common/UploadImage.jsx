import { useState, useRef } from 'react';
import { storage } from '../../firebase';
import { Image } from '../';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import './styles/UploadImage.css';

const UploadImage = ({ image, label, folder, fileName, containerClass, updateData, imageClass }) => {
    const [progress, setProgress] = useState(0);
    const inputRef = useRef(null);

    const uploadImageToFirebase = (e) => {
        const file = e.target.files[0];
        const storageRef = ref(storage, `${folder}/${fileName}`);
        const metadata = {
            contentType: 'image/jpeg',
        };

        const uploadTask  = uploadBytesResumable(storageRef, file, metadata);

        uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
        }, 
        (error) => {
            console.log(error);
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                updateData(label, downloadURL);
            });
        }
    );
    }

    return (
        <div
            className={`upload-image-container ${containerClass}`}
            onClick={() => {
                inputRef.current.click();
            }}
        >
            <div 
                className={`upload-image-progress ${containerClass}`}
                style={{
                    height: progress + '%'
                }}
            />
            {image && (
                <Image
                    image={image} 
                    alt={label}
                    classList={`upload-image ${imageClass}`}
                />
            )}
            <input
                type="file"
                accept="image/*"
                className="upload-image-input"
                ref={inputRef}
                onChange={(e) => {
                    uploadImageToFirebase(e);
                }}
            />
        </div>
    )
}

export default UploadImage