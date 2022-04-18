import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonSizes, ConditionOptions, OperationResult } from '../../enums/enums';
import { Price } from '../../models/Product.model';
import amountFormat from '../../utils/amountFormat';
import Button from '../Button/Button';
import './ProductInfo.scss';
import SearchService from '../../services/Search.service';

export interface ProductInfoProps {
    condition: string;
    sold: number;
    title: string;
    price: Price;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ condition, sold, title, price }): JSX.Element => {
    const navigateTo = useNavigate();

    const addToCart = (): void => {
        navigateTo( SearchService.states.success );
    };

    const properCondition = ( condition: string ): string => {
        if  ( condition === ConditionOptions.nuevo ) {
            return 'Nuevo';
        }
        return 'Usado';
    };

    return (
        <section className='sid-product-info__content product-info__content'>

            <h5 className='sid-product-info__condition product-info__condition'>
                {`${properCondition( condition )} - ${( sold.toLocaleString( 'es-AR' ) )} vendidos`}
            </h5>
            <h3 className='sid-product-info__title product-info__title'>{title}</h3>
            <div className='sid-product-info__amount product-info__amount'>

                <h2 className='product-info__price'>{amountFormat.formatARSAmount( price.amount )}</h2>
                <span className='sid-product-info__decimals product-info__decimals'>
                    {price.decimals > 0 ?
                        price.decimals.toString().length === 1 ?
                            `${price.decimals.toString()}0`
                            : price.decimals
                        : '00'}
                </span>

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
