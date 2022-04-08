import React from 'react'
import { Result } from '../../models/Result.model';
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.scss';

export interface ProductListProps {
    data: Result;
}

const ProductList: React.FC<ProductListProps> = ({ data }): JSX.Element => {
    const elements = data.items.slice(0, 4)
    return (
        <section className='product-list__list'>
            {elements.map((elem, index) =>
                <ProductCard data={elem} key={index} />
            )}
        </section>
    )
}

export default ProductList;