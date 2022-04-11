import api, { getUrl } from '../api/api';
import { Product } from '../models/Product.model';
import { ItemDetailResult, ItemsResult } from '../models/Result.model';
import ItemDetail from '../components/ItemDetail/ItemDetail';

export interface SearchStates {
    home: string;
    search: string;
    detail: string;
}

class SearchService {
    static get states(): SearchStates {
        return {
            home: '/',
            search: '/items',
            detail: '/items/'
        };
    }

    static getProducts(query: string): Promise<ItemsResult> {

        return new Promise((resolve, reject) => {

            const apiResponse = api.get(!!query ? getUrl.searchItems(query) : getUrl.defaultItems);

            apiResponse
                .then((res) => {
                    resolve(res.data)
                })
                .catch((error) => reject(error))
        });
    }

    static getItemDetail(query: string): Promise<ItemDetailResult> {

        return new Promise((resolve, reject) => {

            const apiResponse = api.get(!!query ? getUrl.itemDetail(query) : getUrl.defaultItems);

            apiResponse
                .then((res) => {
                    resolve(res.data)
                })
                .catch((error) => reject(error))
        });
    }
};

export default SearchService;
