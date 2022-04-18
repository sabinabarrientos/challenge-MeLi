import React from 'react';
import './ProductDescription.scss';

export interface ProductDescriptionProps {
    title: string;
    description: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ title, description }): JSX.Element => {

    return (
        <section className='sid-product-description product-description'>
            <h4 className='sid-product-description__title product-description__title'>{title}</h4>
            <p className='sid-product-description__description product-description__description'>{description}</p>
        </section>
    );
};

export default ProductDescription;
