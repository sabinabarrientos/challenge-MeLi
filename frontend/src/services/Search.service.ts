import api, { getUrl } from '../api/api';
import { ItemDetailResult, ItemsResult } from '../models/Result.model';

export interface SearchStates {
    home: string;
    search: string;
    detail: string;
    error: string;
}

class SearchService {
    static get states(): SearchStates {
        return {
            home: '/',
            search: '/items',
            detail: '/items/',
            error: '/error'
        };
    }

    static getProducts( query: string ): Promise<ItemsResult> {

        return new Promise( ( resolve, reject ) => {

            const apiResponse = api.get( !!query ? getUrl.searchItems( query ) : getUrl.defaultItems );

            apiResponse
                .then( ( res ) => {
                    resolve( res.data );
                })
                .catch( ( error ) => reject( error ) );
        });
    }

    static getItemDetail( query: string ): Promise<ItemDetailResult> {

        return new Promise( ( resolve, reject ) => {

            const apiResponse = api.get( !!query ? getUrl.itemDetail( query ) : getUrl.defaultItems );

            apiResponse
                .then( ( res ) => {
                    resolve( res.data );
                })
                .catch( ( error ) => reject( error ) );
        });
    }
}

export default SearchService;
