import { useState, useRef, useEffect } from 'react';
import { arrowRepeatIcon, closeIcon } from '../../constance/icons';
import { Image } from '../';
import './styles/DisplayImage.css';

const DisplayImage = ({image, alt, classList}) => {
    const [showImage, setShowImage] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const imageRef = useRef(null);

    const onClickOutside = (e) => {
        if (e.target.classList.contains('image-overlay') || e.target.classList.contains('image-wrapper')) {
            setShowImage(false);
        }
    }

    useEffect(() => {
        if(imageRef.current) {
            imageRef.current.addEventListener('load', () => {
                setIsImageLoaded(true);
            });
        }

        return () => {
            if(imageRef.current) {
                imageRef.current.removeEventListener('load', () => {
                    setIsImageLoaded(false);
                });
            }
        }
    }, [imageRef]);

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
                    {isImageLoaded ? (
                    <Image
                        classList={`image-content`}
                        image={image}
                        alt={alt}
                    />
                    ) : (
                    <div className="flex align-center mb-1">
                        <div className="btn-icon spinner">{arrowRepeatIcon}</div>
                    </div>
                    )}
                </div>
            </div>
        )}
        <img
            src={image}
            alt={alt}
            className={`image-btn ${classList}${isImageLoaded ? '' : ' d-none'}`}
            onClick={() => setShowImage(true)}
            ref={imageRef}
            decoding="async"
        />
        </>
    )
}

export default DisplayImage