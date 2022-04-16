import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchService from '../../services/Search.service';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';

const HomePage: React.FC = (): JSX.Element => {

    const navigateTo = useNavigate();
    const [ isLoading, setIsLoading ] = useState( false );

    const homeRedirect = (): void => {
        navigateTo( SearchService.states.home );
    };

    const updateQuery = ( query: string ): void => {
        setIsLoading( true );
        const properUrl = `${SearchService.states.search}?search=${query}`;
        navigateTo( properUrl );
    };

    return (
        <section className='sid-home-page'>
            <SearchBar
                onInputChange={updateQuery}
                onClickHandler={homeRedirect}
            />

            {!!isLoading && <Loading />}
        </section>
    );

};

export default HomePage;
