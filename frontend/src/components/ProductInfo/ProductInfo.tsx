import React from 'react';
import { ButtonSizes, ConditionOptions } from '../../enums/enums';
import { Price } from '../../models/Product.model';
import amountFormat from '../../utils/amountFormat';
import Button from '../Button/Button';
import './ProductInfo.scss';

export interface ProductInfoProps {
    condition: string;
    sold: number;
    title: string;
    price: Price;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ condition, sold, title, price }): JSX.Element => {

    const addToCart = (): void => {
        alert( 'compraste el producto' );
    };

    const properCondition = ( condition: string ): string => {
        if  ( condition === ConditionOptions.nuevo ) {
            return 'Nuevo';
        }
        return 'Usado';
    };

    return (
        <section className='product-info__content'>

            <h5 className='product-info__condition'>
                {`${properCondition( condition )} - ${( sold.toLocaleString( 'es-AR' ) )} vendidos`}
            </h5>
            <h3 className='product-info__title'>{title}</h3>
            <div className='product-info__amount'>

                <h2 className='product-info__price'>{amountFormat.formatARSAmount( price.amount )}</h2>
                {price.decimals > 0 &&
                    <span className='product-info__decimals'>{price.decimals}</span>
                }

            </div>

            <Button
                handleOnClick={addToCart}
                text='Comprar'
                size={ButtonSizes.fullwidth}>
            </Button>

        </section>
    );
};

export default ProductInfo;
