import { Product } from './Product.model';

interface Author {
    name: string,
    lastname: string
}

export interface Result {
    author: Author,
    categories: string[],
    items: Product[],
}

