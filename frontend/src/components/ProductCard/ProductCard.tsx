import React, { useContext } from 'react'
import { Product } from '../../models/Product.model';
import AmountFormat from '../../utils/amountFormat';
import freeShippingImg from '../../assets/ic_shipping.png';
import './ProductCard.scss';
import { useNavigate } from 'react-router-dom';
import SearchService from '../../services/Search.service';

export interface ProductListProps {
    data: Product;
}
const ProductCard: React.FC<ProductListProps> = ({ data: { title, price, picture, id, free_shipping, city } }): JSX.Element => {
    const history = useNavigate();

    const itemDetailRedirection = () => {
        history(`${SearchService.states.detail}${id}`);
    }

    return (
        <section>

            <section className='product-card__content' onClick={itemDetailRedirection}>
                <div className='product-card__img'>

                    <img className='product-card__picture' src={picture} alt='muestra-del-producto' />
                </div>
                <div className='product-card__detail'>
                    <div className='product-card__description'>
                        <h2 className='product-card__amount'>
                            {AmountFormat.formatPriceARS(price.currency, price.amount, price.decimals)}
                            {free_shipping && <div>
                                <img className='product-card__free-shipping-icon' src={freeShippingImg} alt='envio-gratis' />
                            </div>}
                        </h2>
                        <h3 className='product-card__title'>
                            {title}
                        </h3>
                    </div>
                    <p className='product-card__location'>
                        {city}
                    </p>
                </div>
            </section>
            <div className='product-card__divider' />
        </section>
    )
}

export default ProductCard;
