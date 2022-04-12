import React, { createContext, useState } from 'react';
import { CurrencyTypes, ConditionOptions } from '../enums/enums';
import { ItemsResult, ItemDetailResult } from '../models/Result.model';
export interface SearchProviderData {
    searchResult: ItemsResult;
    itemDetail: ItemDetailResult;
}

export interface ItemsContextProps {
    data: SearchProviderData;
    // eslint-disable-next-line @typescript-eslint/ban-types
    updateResult: Function;
    // eslint-disable-next-line @typescript-eslint/ban-types
    updateItemDetail: Function;
}

export const defaultSearchResults: ItemsResult = {
    author: {
        name: '',
        lastname: ''
    },
    categories: [],
    items: []
};

export const defaultItemDetailResult: ItemDetailResult = {
    author: {
        name: '',
        lastname: ''
    },
    item: {
        id: '',
        title: '',
        price: {
            currency: CurrencyTypes.arg,
            amount: 0,
            decimals: 0
        },
        categories: [],
        condition: ConditionOptions.nuevo,
        description: '',
        free_shipping: false,
        picture: '',
        sold_quantity: 0
    }
};

export const defaultProviderData: SearchProviderData = {
    searchResult: defaultSearchResults,
    itemDetail: defaultItemDetailResult
};

export const SearchContext = createContext<ItemsContextProps>({
    data: defaultProviderData,
    updateResult: Function,
    updateItemDetail: Function
});

export const SearchProvider: React.FC = ({ children }) => {
    const [ providerValue, setProviderValue ] = useState( defaultProviderData );

    const updateResult = ( newResult: ItemsResult ): void => {
        setProviderValue( ( prevValues ) => {
            return { ...prevValues, searchResult: newResult };
        });
    };

    const updateItemDetail = ( detail: ItemDetailResult ): void => {
        setProviderValue( ( prevValues ) => {
            return { ...prevValues, itemDetail: detail };
        });
    };

    const providerData = {
        data: providerValue,
        updateResult,
        updateItemDetail
    };

    return (
        <SearchContext.Provider value={providerData}>
            {children}
        </SearchContext.Provider>
    );
};
