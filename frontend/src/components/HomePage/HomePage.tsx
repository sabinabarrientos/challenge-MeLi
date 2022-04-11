import React, { useContext, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchService from '../../services/Search.service';
import { SearchContext } from '../../providers/Search.provider';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';

const HomePage: React.FC = (): JSX.Element => {
    const context = useContext(SearchContext);
    const navigateTo = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const homeRedirect = (): void => {
        navigateTo(SearchService.states.home);
    }

    const updateQuery = (query: string): void => {
        setIsLoading(true)
        const properUrl = `${SearchService.states.search}?search=${query}`;
        SearchService.getProducts(query)
            .then((data) => {
                context.updateResult(data);
                navigateTo(properUrl)
            })
            .catch((error) => { console.log(error) })
            .finally(() => setIsLoading(false));
    }

    return (
        <>
            <SearchBar onInputChange={updateQuery} onClickHandler={homeRedirect} />
            {!!isLoading && <Loading />}
        </>
    )

}

export default HomePage;
