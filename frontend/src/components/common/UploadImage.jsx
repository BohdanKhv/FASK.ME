import { useState, useRef, useEffect } from 'react';
import Compressor from 'compressorjs';
import { Image } from '../';
import './styles/UploadImage.css';

const UploadImage = ({ image, containerClass, imageClass, setState, state, progress, maxWidth }) => {
    const inputRef = useRef(null);
    const [imgCompressor, setImgCompressor] = useState(null);

    const format = (size) => {
        if (size === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(size) / Math.log(k));
        return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const calculate = (t) => {
        return (
          Math.round((performance.now() - t + Number.EPSILON) * 100) / 100 + 'ms'
        );
    };

    useEffect(() => {
        if (imgCompressor) {
            const t0 = performance.now();
            new Compressor(imgCompressor, {
                quality: 0.6,
                maxWidth: maxWidth,
                convertSize: 1000000, // 1MB
                success(blob) {
                    console.log('compressorjs', format(blob.size), calculate(t0));
                    setState(
                        blob
                    )
                },
            });
        }
    }, [imgCompressor]);

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
                    if ((e.target.files[0] && e.target.files[0].type === 'image/png') || (e.target.files[0] && e.target.files[0].type === 'image/jpeg') || (e.target.files[0] && e.target.files[0].type === 'image/webp')) {
                        setImgCompressor(e.target.files[0]);
                    }
                }}
            />
        </div>
    )
}

export default UploadImage