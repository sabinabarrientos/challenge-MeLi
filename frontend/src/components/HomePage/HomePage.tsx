import React, { useContext, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchService from '../../services/Search.service';
import { SearchContext } from '../../providers/Search.provider';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = (): JSX.Element => {
    const context = useContext(SearchContext);
    const navigateTo = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState('');

    const getItems = (query: string, urlRedirect: string): void => {
        SearchService.getProducts(query)
            .then((data) => {
                context.updateResult(data);
                navigateTo(urlRedirect)
            })
            .catch((error) => { console.log(error) })
            .finally(() => setIsLoading(false))
    }
    const homeRedirect = (): void => {
        navigateTo(SearchService.states.home);
    }

    const updateQuery = (query: string): void => {
        setIsLoading(true)
        setQuery(query);
        const properUrl = `${SearchService.states.search}?search=${query}`;
        getItems(query, properUrl);
    }

    return (
        <>
            <SearchBar onInputChange={updateQuery} onClickHandler={homeRedirect} />
        </>
    )

}

export default HomePage;