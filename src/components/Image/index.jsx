import { forwardRef, useState, useEffect } from "react";
import images from "@/assets/images";
import classNames from "classnames/bind";
import styles from "./Image.module.scss";

const cx = classNames.bind(styles);

function Image({ src, alt, className, fallback: customFallback = images.noAvatar, ...props }, ref) {
    const [imgSrc, setImgSrc] = useState(src);

    useEffect(() => {
        setImgSrc(src);
    }, [src]);

    const handleError = () => {
        setImgSrc(customFallback);
    };

    const classes = cx("wrapper", className);

    return (
        <img
            className={classes}
            {...props}
            src={imgSrc}
            alt={alt}
            ref={ref}
            onError={handleError}
        />
    );
}

export default forwardRef(Image);
