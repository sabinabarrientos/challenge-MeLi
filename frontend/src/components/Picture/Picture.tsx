import React from 'react';
import './Picture.scss';
import { PictureSizes } from '../../enums/enums';


interface PictureProps {
    size: PictureSizes;
    src: string;
    alt: string;

}
const Picture: React.FC<PictureProps> = ({ src, alt, size }): JSX.Element => {

    return (
        <div className={`picture__container-${size}`}>
            <img className={`picture__img-${size}`} src={src} alt={alt} />
        </div>
    )

}

export default Picture;