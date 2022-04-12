import React from 'react';
import './ProductDescription.scss';

export interface ProductDescriptionProps {
    title: string;
    description: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ title, description }): JSX.Element => {

    return (
        <>
            <h4 className='product-description__title'>{title}</h4>
            <p className='product-description__description'>{description}</p>
        </>
    );
};

export default ProductDescription;
