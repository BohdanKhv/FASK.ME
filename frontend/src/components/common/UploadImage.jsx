import { useState, useRef } from 'react';
import { Image } from '../';
import './styles/UploadImage.css';

const UploadImage = ({ image, containerClass, imageClass, setState, state, progress }) => {
    const inputRef = useRef(null);

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
            {(image || state) && (
                <Image
                    classList={`upload-image ${imageClass}`}
                    image={state ? URL.createObjectURL(state) : image}
                />
            )}
            <input
                type="file"
                accept="image/*"
                className="upload-image-input"
                ref={inputRef}
                onChange={(e) => {
                    if ((e.target.files[0] && e.target.files[0].type === 'image/png') || (e.target.files[0] && e.target.files[0].type === 'image/jpeg')) {
                        // console.log(e.target.files[0]);
                        setState(
                            e.target.files[0]
                        )
                    }
                }}
            />
        </div>
    )
}

export default UploadImage