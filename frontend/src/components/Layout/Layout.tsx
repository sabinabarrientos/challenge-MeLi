import React, { useContext, useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ProductList from '../ProductList/ProductList';
import './Layout.scss';
import SearchService from '../../services/Search.service';
import { SearchContext } from '../../providers/Search.provider';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../Breadcrumb/Breadcrumb';

const Layout: React.FC = (): JSX.Element => {

    const context = useContext(SearchContext);
    const history = useNavigate();

    const [query, setQuery] = useState('');

    useEffect((): void => {
        SearchService.getProducts(query)
            .then((data) => {
                context.updateResult(data);
            })
            .catch((error) => { console.log(error) })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getItems = (query: string): void => {
        SearchService.getProducts(query)
            .then((data) => {
                context.updateResult(data);
            })
            .catch((error) => { console.log(error) })
    }

    const clickRedirect = (): void => {
        getItems('')
        history(SearchService.states.home)
    }

    const updateQuery = (query: string): void => {
        setQuery(query);
        SearchService.getProducts(query)
            .then((data) => {
                context.updateResult(data);
            })
            .catch((error) => { console.log(error) })
        history(`${SearchService.states.search}?search=${query}`)
    }

    return (
        <>
            <SearchBar onInputChange={updateQuery} onClickHandler={clickRedirect} />
            <section className='layout__content'>
                <Breadcrumb categories={context.data.searchResult.categories} />
                <ProductList data={context.data.searchResult} />
            </section>
        </>
    )

}

export default Layout;