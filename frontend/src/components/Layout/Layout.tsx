import React, { useContext, useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ProductList from '../ProductList/ProductList';
import SearchService from '../../services/Search.service';
import { SearchContext } from '../../providers/Search.provider';
import { useLocation, useNavigate } from 'react-router-dom';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import Loading from '../Loading/Loading';
import { usePageTitle } from '../../hooks/usePageTitle';
import './Layout.scss';

const Layout: React.FC = (): JSX.Element => {
    const location = useLocation();
    const searchParam = location.search.split( '=' )[1];
    const context = useContext( SearchContext );
    const navigateTo = useNavigate();
    const [ isLoading, setIsLoading ] = useState( true );

    useEffect( (): void => {

        SearchService.getProducts( searchParam )
            .then( ( data ) => {
                context.updateResult( data );
            })
            .catch( () => navigateTo( SearchService.states.error ) )
            .finally( () => setIsLoading( false ) );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] );

    usePageTitle( `${searchParam} | Mercado Libre Argentina` );

    const homeRedirect = (): void => {
        navigateTo( SearchService.states.home );
    };

    const updateQuery = ( query: string ): void => {

        setIsLoading( true );
        const properUrl = `${SearchService.states.search}?search=${query}`;

        SearchService.getProducts( query )
            .then( ( data ) => {
                context.updateResult( data );
                navigateTo( properUrl );
            })
            .catch( () => navigateTo( SearchService.states.error ) )
            .finally( () => setIsLoading( false ) );
    };

    return (
        <section className='sid-layout'>
            <SearchBar
                onInputChange={updateQuery}
                onClickHandler={homeRedirect} />

            {!!isLoading && <Loading />}

            <section className='layout__content'>
                {!isLoading && <>
                    {context.data.searchResult.categories &&
                    <Breadcrumb categories={context.data.searchResult.categories}
                    />}
                    <ProductList data={context.data.searchResult} />
                </>}
            </section>
        </section>
    );
};

export default Layout;
