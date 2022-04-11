import React, { useContext, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ProductList from '../ProductList/ProductList';
import './Layout.scss';
import SearchService from '../../services/Search.service';
import { SearchContext } from '../../providers/Search.provider';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import Loading from '../Loading/Loading';

const Layout: React.FC = (): JSX.Element => {

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

            <section className='layout__content'>
                {!isLoading && <>
                    {context.data.searchResult.categories && <Breadcrumb categories={context.data.searchResult.categories} />}
                    <ProductList data={context.data.searchResult} />
                </>}
            </section>
        </>
    )

}

export default Layout;