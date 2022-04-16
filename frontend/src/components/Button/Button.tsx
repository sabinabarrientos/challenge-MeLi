import React from 'react';
import { ButtonSizes } from '../../enums/enums';
import './Button.scss';

export interface ButtonProps {
    handleOnClick: () => void;
    text: string;
    size: ButtonSizes;
}

const Button: React.FC<ButtonProps> = ({ handleOnClick, text, size }): JSX.Element => {
    return (

        <button
            aria-label={text}
            type='button'
            className={`sid-button__${size} button__${size}`}
            onClick={handleOnClick}
        >
            <p className='sid-button__text button__text'>
                {text}
            </p>
        </button>

    );
};

export default Button;
