import { useState } from 'react';
import { closeIcon } from '../../constance/icons';
import './styles/Image.css';

const Image = ({image, alt, classList}) => {
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
                <div className="image-wrapper">
                    <img
                        className="image-content"
                        src={image}
                        alt={alt}
                    />
                </div>
            </div>
        )}
        <img
            src={image}
            alt={alt}
            className={`image-btn ${classList}`}
            onClick={() => setShowImage(!showImage)}
        />
        </>
    )
}

export default Image