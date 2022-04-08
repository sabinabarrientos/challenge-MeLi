import { CurrencyTypes } from '../enums/enums';

interface Price {
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
    condition: string,
    city: string;
}