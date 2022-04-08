import React, { createContext, useState } from 'react';
import { Result } from '../models/Result.model';
export interface SearchProviderData {
    searchResult: Result;
    selectedItem: string | undefined;
}

export interface ItemsContextProps {
    data: SearchProviderData;
    updateResult: Function;
    updateSelectedItem: Function;
}

export const defaultSearchResults: Result = {
    author: {
        name: '',
        lastname: ''
    },
    categories: [],
    items: [],
};

export const defaultProviderData: SearchProviderData = {
    searchResult: defaultSearchResults,
    selectedItem: undefined
};

export const SearchContext = createContext<ItemsContextProps>({
    data: defaultProviderData,
    updateResult: Function,
    updateSelectedItem: Function
});

export const SearchProvider: React.FC = ({ children }) => {
    const [providerValue, setProviderValue] = useState(defaultProviderData);

    const updateResult = (newResult: Result): void => {
        setProviderValue((prevValues) => {
            return { ...prevValues, searchResult: newResult };
        });
    };

    const updateSelectedItem = (id: string): void => {
        setProviderValue((prevValues) => {
            return { ...prevValues, selectedItem: id };
        });
    };

    const providerData = {
        data: providerValue,
        updateResult,
        updateSelectedItem
    };

    return (
        <SearchContext.Provider value={providerData}>
            {children}
        </SearchContext.Provider>
    );
};