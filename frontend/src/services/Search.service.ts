import api, { getUrl } from '../api/api';
import { Result } from '../models/Result.model';

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
            detail: '/items/:id'
        };
    }

    static getProducts(query: string): Promise<Result> {

        return new Promise((resolve, reject) => {
            console.log('query en el servicio', query)

            const apiResponse = api.get(!!query ? getUrl.searchItems(query) : getUrl.defaultItems);

            apiResponse
                .then((res) => {
                    console.log(res.data)
                    resolve(res.data)
                })
                .catch((error) => reject(error))
        });
    }
};

export default SearchService;
