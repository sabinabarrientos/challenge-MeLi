import { ConditionOptions, CurrencyTypes } from '../enums/enums';

export interface Price {
    currency: CurrencyTypes,
    amount: number,
    decimals: number
};

export interface Product {
    title: string,
    price: Price,
    picture: string,
    id: string,
    free_shipping: boolean,
    condition: ConditionOptions,
    city: string;
}
export interface ProductDetail {
    id: string;
    title: string;
    price: Price;
    categories: string[];
    condition: ConditionOptions;
    description: string;
    free_shipping: boolean;
    picture: string;
    sold_quantity: number;
}