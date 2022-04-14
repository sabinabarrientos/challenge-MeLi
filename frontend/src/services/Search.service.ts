import api, { getUrl } from '../api/api';
import { ItemDetailResult, ItemsResult } from '../models/Result.model';

export interface SearchStates {
    home: string;
    search: string;
    detail: string;
    error: string;
    success: string;

}

class SearchService {
    /**
    * Returns the routes for child components
    */
    static get states(): SearchStates {
        return {
            home: '/',
            search: '/items',
            detail: '/items/',
            error: '/error',
            success: '/success'
        };
    }

    /**
    * Gets a list of products given a query
    * @params query - Search term
    */
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

    /**
    * Gets the detail of a given product id
    * @params id - Product ID
    */
    static getItemDetail( id: string ): Promise<ItemDetailResult> {

        return new Promise( ( resolve, reject ) => {

            const apiResponse = api.get( !!id ? getUrl.itemDetail( id ) : getUrl.defaultItems );

            apiResponse
                .then( ( res ) => {
                    resolve( res.data );
                })
                .catch( ( error ) => reject( error ) );
        });
    }
}

export default SearchService;
