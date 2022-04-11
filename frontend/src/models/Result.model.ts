import { Product, ProductDetail } from './Product.model';

interface Author {
    name: string,
    lastname: string
}

export interface ItemsResult {
    author: Author,
    categories: string[],
    items: Product[],
}

export interface ItemDetailResult {
    author: Author,
    item: ProductDetail,
}

