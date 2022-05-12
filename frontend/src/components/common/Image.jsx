import { useState, useRef, useEffect } from "react"

const Image = ({ image, alt, classList }) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false)
    const imageRef = useRef(null)

    useEffect(() => {
        if (imageRef.current) {
            imageRef.current.addEventListener("load", () => {
                setIsImageLoaded(true)
            })
        }

        return () => {
            if (imageRef.current) {
                imageRef.current.removeEventListener("load", () => {
                    setIsImageLoaded(false)
                });
            }
        }
    }, [])

    return (
        <img
            className={`${classList}${isImageLoaded ? '' : ' opacity-0'}`}
            src={image}
            alt={alt}
            ref={imageRef}
        />
    )
}

export default Image