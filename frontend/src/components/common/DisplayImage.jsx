import { useState, useRef, useEffect } from 'react';
import { arrowRepeatIcon, closeIcon } from '../../constance/icons';
import { Image } from '../';
import './styles/DisplayImage.css';

const DisplayImage = ({image, alt, classList}) => {
    const [showImage, setShowImage] = useState(false);

    const onClickOutside = (e) => {
        if (e.target.classList.contains('image-overlay') || e.target.classList.contains('image-wrapper')) {
            setShowImage(false);
        }
    }

    return (
        <>
        {showImage && (
            <div 
                className="image-overlay"
                onClick={onClickOutside}
            >
                <div className="close position-absolute">
                    <div 
                        className="btn-icon"
                        onClick={() => setShowImage(false)}
                        title="Close"
                    >
                        {closeIcon}
                    </div>
                </div>
                <div className="image-wrapper container">
                    <Image
                        classList={`image-content`}
                        image={image}
                        alt={alt}
                    />
                </div>
            </div>
        )}
        <Image
            classList={`image-btn ${classList}`}
            image={image}
            alt={alt}
            onClick={() => setShowImage(true)}
        />
        </>
    )
}

export default DisplayImage