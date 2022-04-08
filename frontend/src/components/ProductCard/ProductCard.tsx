import React from 'react'
import { Product } from '../../models/Product.model';
import AmountFormat from '../../utils/amountFormat';
import freeShippingImg from '../../assets/ic_shipping.png'
import './ProductCard.scss';

export interface ProductListProps {
    data: Product;
}
const ProductCard: React.FC<ProductListProps> = ({ data: { title, price, picture, id, free_shipping, condition, city } }): JSX.Element => {

    return (
        <section>

            <section className='product-card__content' onClick={() => alert('gjsid')}>
                <div className='product-card__img'>

                    <img className='product-card__picture' src={picture} alt='producto' />
                </div>
                <div className='product-card__detail'>
                    <div className='product-card__description'>
                        <div className='product-card__amount'>
                            {AmountFormat.formatPriceARS(price.currency, price.amount, price.decimals)}
                            {free_shipping && <div>
                                <img className='product-card__free-shipping-icon' src={freeShippingImg} alt='free-shipping-icon' />
                            </div>}
                        </div>
                        <div className='product-card__title'>
                            {title}
                        </div>
                    </div>
                    <div className='product-card__location'>
                        {city}
                    </div>
                </div>
            </section>
            <div className='product-card__divider'></div>
        </section>
    )
}

export default ProductCard;
