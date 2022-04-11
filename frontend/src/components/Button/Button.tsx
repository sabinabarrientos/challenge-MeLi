import React from 'react'
import './Button.scss';
import { ButtonSizes } from '../../enums/enums';

export interface ButtonProps {
    handleOnClick: () => void;
    text: string;
    size: ButtonSizes;
}

const Button: React.FC<ButtonProps> = ({ handleOnClick, text, size }): JSX.Element => {
    return (
        <button aria-label={text} type='button' className={`button__${size}`} onClick={handleOnClick}>
            <p className='button__text'>{text}</p>
        </button>
    )
}

export default Button;