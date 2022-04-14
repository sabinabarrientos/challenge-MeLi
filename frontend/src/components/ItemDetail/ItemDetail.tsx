import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SearchContext } from '../../providers/Search.provider';
import SearchService from '../../services/Search.service';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import SearchBar from '../SearchBar/SearchBar';
import Loading from '../Loading/Loading';
import Picture from '../Picture/Picture';
import { OperationResult, PictureSizes } from '../../enums/enums';
import ProductInfo from '../ProductInfo/ProductInfo';
import ProductDescription from '../ProductDescription/ProductDescription';
import { usePageTitle } from '../../hooks/usePageTitle';
import './ItemDetail.scss';

const ItemDetail: React.FC = (): JSX.Element => {

    const context = useContext( SearchContext );
    const navigateTo = useNavigate();
    const itemId = useParams();
    const [ query, setQuery ] = useState( itemId.id || '' );
    const [ isLoading, setIsLoading ] = useState( true );

    useEffect( (): void => {
        SearchService.getItemDetail( query )
            .then( ( data ) => {
                context.updateItemDetail( data );
            })
            .catch( () => navigateTo( SearchService.states.error, { state: OperationResult.error }) )
            .finally( () => setIsLoading( false ) );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] );

    usePageTitle( context.data.itemDetail.item.title );

    const getItems = ( query: string, urlRedirect: string ): void => {
        SearchService.getProducts( query )
            .then( ( data ) => {
                context.updateResult( data );
                navigateTo( urlRedirect );
            })
            .catch( () => navigateTo( SearchService.states.error, { state: OperationResult.error }) )
            .finally( () => setIsLoading( false ) );
    };

    const homeRedirect = (): void => {
        navigateTo( SearchService.states.home );
    };

    const updateQuery = ( query: string ): void => {
        setQuery( query );
        const properUrl = `${SearchService.states.search}?search=${query}`;
        getItems( query, properUrl );
        setIsLoading( true );
    };

    return (
        <>
            <SearchBar
                onInputChange={updateQuery}
                onClickHandler={homeRedirect}
            />
            {!!isLoading && <Loading />}

            {!isLoading &&
                <section className='item-detail__container'>
                    <Breadcrumb categories={context.data.itemDetail.item.categories} />
                    <section className='item-detail__content'>

                        <section className='item-detail__info'>
                            <Picture
                                src={context.data.itemDetail.item.picture}
                                alt='imagen del producto'
                                size={PictureSizes.large}
                            />
                            <aside className='item-detail__aside'>
                                <ProductInfo
                                    condition={context.data.itemDetail.item.condition}
                                    sold={context.data.itemDetail.item.sold_quantity}
                                    title={context.data.itemDetail.item.title}
                                    price={context.data.itemDetail.item.price}
                                />
                            </aside>
                        </section>

                        <section className='item-detail__description'>
                            <ProductDescription
                                title='Descripción del producto'
                                description={context.data.itemDetail.item.description}
                            />
                        </section>
                    </section>

                </section>
            }
        </>
    );
};

export default ItemDetail;
